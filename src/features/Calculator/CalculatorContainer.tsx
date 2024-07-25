/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik, FormikErrors } from "formik";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import PageLayout from "../../layouts/PageLayout";
import { ICoversLimits, IProductConfig } from "../../models/common";
import { showModal } from "slices/modal";
import { useAppDispatch } from "../../AppStore";
import { theme } from "../../theme/theme";
import { ColorType } from "../../theme/types";
import {
  hasFundContributionError,
  hasRopOptionError,
  someRequiredFieldsNotFilled,
} from "../../utils/formHelpers";
import { redirect } from "../../utils/router";
import IllustrationViewer from "../IllustrationViewer";
import { CalculationIdType } from "../Products/types";
import { Calculator } from "./Calculator/Calculator";
import { CalculatorTabs } from "./components/CalculatorTabs";
import ProductSelect from "./ProductSelect/ProductSelect";
import { ICalculationVM, ICoversConfigMap, ValueType } from "./types";
import {
  getCalculationCopy,
  getCalculationId,
  isCalculation,
  mergeWithDefaultValues,
} from "./utils";
import { getValidationSchema } from "./validationSchema/validationSchema";
import { CalculationState, CalculationStatus } from "models/calculator";
import { Icon } from "components/UI/Icon";
import { PageFooterConfig } from "layouts/PageLayout.types";

const TabColorsMap = [
  theme.newColors.primary100,
  theme.newColors.violet,
  theme.newColors.secondary100,
];

const TabsAndProductRow = styled.div<{ index: number }>`
  margin: 0 auto;
  width: 100%;
  display: flex;
  border-bottom: 4px solid ${(props) => TabColorsMap[props.index]};
  background-color: ${({ theme }) => theme.newColors.white100};
  height: 80px;
  padding: 24px 48px 0;
`;

// Formik doesn't understand that our PageLayout connected component is a valid child.
const StyledForm = styled(Form as unknown as "form")`
  height: 100%;
`;

const CheckIcon = styled(Icon)`
  right: 10px;
  top: 13px;
  margin-right: 12px;

  & path {
    stroke: ${({ theme }) => theme.newColors.white100};
  }
`;

const submitButtonProps = {
  backgroundColor: "green" as ColorType,
  color: "white" as ColorType,
  children: <FormattedMessage id={"bottomButtonBar.showIllustration"} />,
};

const checkedButtonProps = {
  children: (
    <>
      <CheckIcon name="check" />
      <FormattedMessage id={"bottomButtonBar.showIllustration"} />
    </>
  ),
};

interface IProps {
  calculate: (values: ICalculationVM) => void;
  index: number;
  productGuid: number;
  productConfigItem: IProductConfig;
  calculations: Array<CalculationIdType | ICalculationVM>;
  removeCalculation: (params: { productGuid: number; index: number }) => void;
  removeIllustration: (params: {
    calculationId: number;
    callback?(): void;
  }) => void;
  openCalculation: (params: { productGuid: number; index: number }) => void;
  setCalculation: (params: {
    productGuid: number;
    index: number;
    calculation: ICalculationVM | null;
  }) => void;
  calculationsState: {
    [calculationId: number]: CalculationState;
  };
  setCalculationStatus: (params: {
    calculationId: number;
    status: CalculationStatus;
  }) => void;
  previewIllustration: (calculationId: number) => void;
  isIllustrationPreviewed: boolean;
  showUnillustratedCalculationsWarning: (onConfirm: () => void) => void;
  handleIllustrationExit: (onConfirm: () => void) => void;
  coversLimits: ICoversLimits;
  coversConfigMap: ICoversConfigMap;
}

const handlePreviewIllustration = (props: IProps) => () => {
  const calculationId = getCalculationId(props.calculations[props.index]);
  if (calculationId) {
    props.previewIllustration(calculationId);
  }
};

const CalculatorContainer: React.FC<IProps> = (props) => {
  const formikRef = useRef<Formik<ICalculationVM>>(null);
  const currentCalculation = props.calculations[props.index];
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const [initialValuesDefaults, setInitialValuesDefaults] = useState(false);
  const [formErrors, setFormErrors] = useState<object | undefined>(undefined);
  const dispatch = useAppDispatch();

  const formId = props.productGuid + "-" + props.index;
  useEffect(() => {
    setFormErrors({});
    setInitiallyLoaded(true);
  }, [formId]);

  const initialValues = useMemo(() => {
    setFormChanged(true);
    if (isCalculation(currentCalculation)) {
      setInitialValuesDefaults(false);
      return currentCalculation as ICalculationVM;
    }
    setInitialValuesDefaults(true);
    return mergeWithDefaultValues({
      productGuid: props.productGuid,
      productCategories: props.productConfigItem.product_categories,
    });
  }, [currentCalculation]);

  useEffect(() => {
    if (!(props.productGuid && currentCalculation)) {
      redirect("/meeting");
    }
  }, [props.productGuid]);

  useEffect(() => {
    if (formErrors) {
      setFormErrors(undefined);
      if (formikRef.current) {
        formikRef.current.setErrors(formErrors);
      }
    }
  }, [formErrors]);

  useEffect(() => {
    if (initiallyLoaded && formChanged && !initialValuesDefaults) {
      setInitiallyLoaded(false);
      setFormChanged(false);
      setInitialValuesDefaults(false);
      if (formikRef.current) {
        formikRef.current.validateForm(initialValues);
      }
    }
  }, [initiallyLoaded, formChanged, initialValuesDefaults]);

  const getCalculationStatus = useCallback(
    (calculation: ICalculationVM | CalculationIdType) => {
      const calculationId = getCalculationId(calculation);
      return calculationId
        ? (props.calculationsState[calculationId] || {}).status ||
            CalculationStatus.NotCalculated
        : CalculationStatus.NotCalculated;
    },
    [props.calculationsState]
  );

  const isValid = useCallback(
    (errors: FormikErrors<ICalculationVM>) =>
      isObject(errors) && isEmpty(errors),
    []
  );

  const currentCalculationStatus = useMemo(
    () => getCalculationStatus(currentCalculation),
    [props.index, props.calculations, props.calculationsState]
  );

  const handleSubmit = (values: ICalculationVM) => {
    props.calculate(values);
  };

  const invalidateCalculation = () => {
    const calculationId = getCalculationId(currentCalculation);
    if (calculationId) {
      props.setCalculationStatus({
        calculationId,
        status: CalculationStatus.Invalid,
      });
    }
  };

  const saveCalculation = (values: ICalculationVM) =>
    props.setCalculation({
      productGuid: props.productGuid,
      index: props.index,
      calculation: values,
    });

  const getChangeTabHandler = (values: ICalculationVM) => (index: number) => {
    saveCalculation(values);
    props.openCalculation({ productGuid: props.productGuid, index });
  };

  const getNewTabHandler = (values: ICalculationVM) => (index: number) => {
    saveCalculation(values);
    props.setCalculation({
      productGuid: props.productGuid,
      index,
      calculation: getCalculationCopy(values),
    });
    props.openCalculation({ productGuid: props.productGuid, index });
  };

  const handleCalculationExit = () =>
    props.showUnillustratedCalculationsWarning(() => redirect("/meeting"));

  const removeTab = (values: ICalculationVM) => (index: number) => {
    saveCalculation(values);
    const calculationIdToRemove = getCalculationId(props.calculations[index]);
    if (calculationIdToRemove) {
      props.removeIllustration({
        calculationId: calculationIdToRemove,
        callback: () => {
          props.removeCalculation({ productGuid: props.productGuid, index });
        },
      });
    } else {
      props.removeCalculation({ productGuid: props.productGuid, index });
    }
    setFormErrors({});
    setFormChanged(true);
    setInitiallyLoaded(true);
  };

  const getPageFooter = (
    handleSubmitAttempt: () => void,
    calculateDisabled: boolean
  ): PageFooterConfig => ({
    leftSection: [
      { config: "prevButtonConfig", onClick: handleCalculationExit },
    ],
    rightSection: [
      currentCalculationStatus === CalculationStatus.Calculated ||
      currentCalculationStatus === CalculationStatus.Illustrated
        ? {
            ...(currentCalculationStatus === CalculationStatus.Illustrated
              ? checkedButtonProps
              : submitButtonProps),
            onClick: handlePreviewIllustration(props),
          }
        : {
            config: "calculateButtonConfig",
            onClick: handleSubmitAttempt,
            disabled: calculateDisabled,
          },
      {
        config: "getArrowNextConfig",
        message: "bottomButtonBar.products",
        disabled: currentCalculationStatus !== CalculationStatus.Illustrated,
        onClick: handleCalculationExit,
      },
    ],
  });

  return props.isIllustrationPreviewed ? (
    <IllustrationViewer onOpenConfirmModal={props.handleIllustrationExit} />
  ) : (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        ref={formikRef}
        enableReinitialize={true}
        key={`${props.productGuid}_${props.index}`}
        validationSchema={getValidationSchema(
          initialValues.productCategories,
          props.coversLimits,
          props.coversConfigMap,
          props.productGuid,
          props.productConfigItem.product_funds
        )}
        isInitialValid={true}
      >
        {({ values, setFieldValue, errors, validateForm }) => {
          const handleProductChange = (productGuid: number) => {
            saveCalculation(values);
            setFormErrors({});
          };

          const handleSubmitAttempt = () => {
            validateForm(values).then((err) => {
              const openModal = (id: string) => {
                dispatch(showModal({ modalContentTrKey: id }));
              };

              if (hasRopOptionError(err)) {
                return openModal(
                  "calculator.validation.ropOption.OPTION_NOT_AVAILABLE"
                );
              }

              if (someRequiredFieldsNotFilled(err)) {
                return openModal("calculator.mandatoryFieldsMessage");
              }

              if (hasFundContributionError(err)) {
                return openModal(
                  "calculator.validation.fundContributions.PERCENTAGE_IS_NOT_100"
                );
              }
            });
          };

          const handleSetFieldValue = (key: string, value: ValueType) => {
            invalidateCalculation();
            setFieldValue(key, value);
          };

          return (
            <StyledForm>
              <PageLayout
                contentHeader={
                  <TabsAndProductRow index={props.index}>
                    <ProductSelect
                      productGuid={props.productGuid}
                      onChange={handleProductChange}
                    />
                    <CalculatorTabs
                      current={props.index}
                      onClick={getChangeTabHandler(values)}
                      onNew={getNewTabHandler(values)}
                      onRemove={removeTab(values)}
                      calculationsStatuses={props.calculations.map(
                        (calculation) => getCalculationStatus(calculation)
                      )}
                    />
                  </TabsAndProductRow>
                }
                footer={getPageFooter(
                  handleSubmitAttempt,
                  !isValid(errors) &&
                    !someRequiredFieldsNotFilled(errors) &&
                    !hasFundContributionError(errors) &&
                    !hasRopOptionError(errors)
                )}
                pageName="calculator.illustrationCalculator"
              >
                <Calculator
                  values={values}
                  errors={errors}
                  setFieldValue={handleSetFieldValue}
                  productsConfigItem={props.productConfigItem}
                />
              </PageLayout>
            </StyledForm>
          );
        }}
      </Formik>
    </>
  );
};

export default CalculatorContainer;
