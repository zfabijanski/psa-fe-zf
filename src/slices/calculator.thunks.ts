import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearUnillustratedCalculations,
  setCalculation,
  setCalculationStatus,
  setCalculationsIds,
  setCurrentCalculation,
  getCalculationSelector,
} from "./calculator";
import { ApiError, api } from "utils/api";
import { CalculationIdType } from "features/Products/types";
import {
  CalculationStatus,
  ICalculateResponseDto,
  ICalculationDetailsDto,
  MessageType,
  YesNo,
} from "models/calculator";
import { RootState } from "AppStore";
import {
  getCalculationId,
  getCalculationStatus,
  isCalculation,
} from "features/Calculator/utils";
import mapDtoToVm from "mapper/calculator/dtoToVm";
import {
  getCoversConfigMap,
  getCoversPerProductMap,
  getProductsConfigMap,
  getFundRiskProfilesConfig,
  getProductsWithIllustrations,
} from "utils/selectors";
import {
  hideFullscreenSpinner,
  showFullscreenSpinner,
} from "./fullscreenSpinner";
import { ICalculationVM } from "features/Calculator/types";
import { showModal } from "./modal";
import mapVmToDto from "mapper/calculator/vmToDto";
import {
  clearUnillustratedCalculationsRequest,
  setCurrentMeetingOutdated,
} from "./meetings";
import { newErrorModal } from "utils/confirmModalFactory";
import { previewIllustration } from "slices/illustrations";

const apiPrefix = "/api/calc";

const getValues = (productGuid: number, calculationId?: CalculationIdType) => {
  if (calculationId) {
    return api.get<ICalculationDetailsDto>(
      `${apiPrefix}/calculation-details/${calculationId}`
    );
  }

  return api.get<ICalculationDetailsDto>(
    `${apiPrefix}/calculation-defaults?productGuid=${productGuid}`
  );
};

const getCalculationsFromIllustrations = (
  state: RootState,
  productGuid: number
) => {
  const {
    illustrations: { items: illustrationItems },
  } = state;

  return illustrationItems
    .filter((x) => x.product_guid === productGuid)
    .map((x) => x && x.pru_calc_calculation_id)
    .filter(Boolean);
};

export const removeCalculation = createAsyncThunk(
  "calculator/removeCalculation",
  async (
    { productGuid, index }: { productGuid: number; index: number },
    { getState, dispatch }
  ) => {
    const {
      calculator: { current, calculations },
    } = getState() as RootState;
    dispatch(setCalculation({ productGuid, index, calculation: null }));

    if (current.index === index) {
      const isLast = calculations[productGuid].length - 1 === index;
      dispatch(
        openCalculation({
          productGuid,
          index: isLast ? Math.max(index - 1, 0) : index,
        })
      );
    } else if (current.index > index) {
      dispatch(
        setCurrentCalculation({ productGuid, index: current.index - 1 })
      );
    }
  }
);

export const getCalculationValues = createAsyncThunk(
  "calculator/getCalculationValues",
  async (
    { productGuid, index }: { productGuid: number; index: number },
    { getState, dispatch }
  ) => {
    const state = getState() as RootState;
    const calculation = getCalculationSelector(state, productGuid, index);

    if (isCalculation(calculation)) {
      return;
    }

    return getValues(productGuid, calculation as CalculationIdType)
      .then((calculationValues) => {
        const calculation = mapDtoToVm(
          calculationValues,
          getCoversConfigMap(state),
          getCoversPerProductMap(state),
          getProductsConfigMap(state),
          getFundRiskProfilesConfig(state)
        );
        dispatch(setCalculation({ productGuid, index, calculation }));
        const calculationId = getCalculationId(calculation);
        if (!!calculationId) {
          dispatch(
            setCalculationStatus({
              calculationId,
              status: CalculationStatus.Illustrated,
            })
          );
        }
      })
      .catch(() => dispatch(hideFullscreenSpinner()));
  }
);

export const openCalculation = createAsyncThunk(
  "calculator/openCalculation",
  async (
    {
      productGuid,
      index,
      forceRefresh = false,
    }: { productGuid: number; index: number; forceRefresh?: boolean },
    { getState, dispatch }
  ) => {
    const state = getState() as RootState;
    dispatch(showFullscreenSpinner());

    const currentCalculations =
      state.calculator.calculations[productGuid] || [];

    if (!currentCalculations.length || forceRefresh) {
      const calculations = getCalculationsFromIllustrations(state, productGuid);
      dispatch(setCalculationsIds({ productGuid, calculations }));
    }

    await dispatch(getCalculationValues({ productGuid, index }));

    dispatch(setCurrentCalculation({ productGuid, index }));
    dispatch(hideFullscreenSpinner());
  }
);

export const calculate = createAsyncThunk(
  "calculator/calculate",
  async (calculation: ICalculationVM, { getState, dispatch }) => {
    const state = getState() as RootState;
    const selectedProduct = getProductsWithIllustrations(state).find(
      (product) => product.product_guid === state.calculator.current.productGuid
    );

    if (!selectedProduct) {
      // todo: show error popup instead of just console.log
      // tslint:disable-next-line: no-console
      console.log(
        "Error: no product for ID: ",
        state.calculator.current.productGuid
      );
      return;
    }
    const everyChildHasCover = calculation.additionalLifeAssureds.every(
      (additionalLifeAssured) =>
        additionalLifeAssured.covers.some(
          (cover) => cover.checked === YesNo.Yes
        )
    );

    if (!everyChildHasCover) {
      dispatch(
        showModal({
          modalContentTrKey:
            "calculator.validation.additionalLifeAssureds.covers.required",
        })
      );
      return;
    }

    dispatch(showFullscreenSpinner());

    const currentIndex = state.calculator.current.index;
    const calculationDto = mapVmToDto(calculation);
    api
      .post<ICalculateResponseDto>(`${apiPrefix}/calculate-and-add`, {
        meeting_product_id: selectedProduct.meeting_product_id,
        order_id: currentIndex + 1,
        ...calculationDto,
      })
      .then((response) => {
        const state = getState() as RootState;
        const errors = response.msg.filter(
          (msg) => msg.msg_type === MessageType.Error
        );
        if (errors.length) {
          const errorMessage = errors.map((error) => error.msg_mesage);
          dispatch(showModal({ modalContentTrKey: errorMessage }));
          return;
        }

        const calculationValuesVM = mapDtoToVm(
          response.calculation,
          getCoversConfigMap(state),
          getCoversPerProductMap(state),
          getProductsConfigMap(state),
          getFundRiskProfilesConfig(state),
          calculation.mainCover.directionOfCalculation
        );
        const { productGuid, index } = state.calculator.current;
        dispatch(
          setCalculation({
            calculation: calculationValuesVM,
            productGuid,
            index,
          })
        );
        if (calculationValuesVM.calculationId) {
          dispatch(
            setCalculationStatus({
              calculationId: calculationValuesVM.calculationId,
              status: CalculationStatus.Calculated,
            })
          );
        }
        dispatch(setCurrentMeetingOutdated());
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      })
      .finally(() => dispatch(hideFullscreenSpinner()));
  }
);

// (onConfirm: () => void): ThunkResult =>
export const showUnillustratedCalculationsWarning = createAsyncThunk(
  "calculator/showUnillustratedCalculationsWarning",
  async (onConfirm: () => void, { getState, dispatch }) => {
    const state = getState() as RootState;
    const hasUnillustratedCalculations = !!Object.values(
      state.calculator.calculations
    )
      .flat()
      .find(
        (calculation: CalculationIdType | ICalculationVM) =>
          getCalculationStatus(
            state.calculator.calculationsState,
            calculation
          ) !== CalculationStatus.Illustrated
      );
    if (hasUnillustratedCalculations) {
      dispatch(
        showModal({
          modalContentTrKey: "calculator.confirm.exit",
          modalButtons: {
            confirm: {
              textTrKey: "confirmWindow.next",
              onClick: onConfirm,
            },
            cancel: {
              textTrKey: "confirmWindow.back",
            },
          },
        })
      );
    } else {
      onConfirm();
    }
  }
);
// (onConfirm: () => void): ThunkResult =>

export const handleIllustrationExit = createAsyncThunk(
  "calculator/handleIllustrationExit",
  async (onConfirm: () => void, { getState, dispatch }) => {
    dispatch(
      showUnillustratedCalculationsWarning(async () => {
        await dispatch(clearUnillustratedCalculationsRequest());
        dispatch(clearUnillustratedCalculations());
        onConfirm();
      })
    );
  }
);

export const illustrateAndPreviewCalculation = createAsyncThunk(
  "calculator/illustrateAndPreviewCalculation",
  async (calculationId: number, { dispatch }) => {
    dispatch(previewIllustration(calculationId));
    api
      .post(`${apiPrefix}/ilustrate-calculation`, {
        p_pru_calc_calculation_id: calculationId,
      })
      .then(() => {
        dispatch(
          setCalculationStatus({
            calculationId,
            status: CalculationStatus.Illustrated,
          })
        );
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          dispatch(showModal(newErrorModal(error.message)));
        }
      });
  }
);
