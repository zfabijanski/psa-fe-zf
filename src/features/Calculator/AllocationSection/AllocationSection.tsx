import { FormikActions, FormikState } from "formik";
import { get } from "lodash";
import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { CurrencyInput } from "../../../components/UI/CurrencyInput";
import { ETextAlign } from "../../../components/UI/Input";
import { ModalInfoIcon } from "../../../components/UI/ModalInfoIcon";
import { PercentInput } from "../../../components/UI/PercentInput";
import PruCheckbox from "../../../components/UI/PruCheckbox/PruCheckbox";
import { Select } from "../../../components/UI/Select";
import { TypoH3, TypoSubheader } from "../../../components/UI/typography";
import { GridRow } from "../components/CalculatorGrid";
import { ICalculationVM, IFundContribution } from "../types";

interface IProps
  extends Pick<FormikActions<ICalculationVM>, "setFieldValue">,
    Pick<FormikState<Array<Partial<IFundContribution>>>, "errors" | "values"> {
  name: string;
}

const AllocationSectionBody = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.newColors.gray30};
  margin-bottom: 32px;
`;

const AllocationGridRow = styled(GridRow)`
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 24px;
  align-items: start;
`;

const AllocationSectionHeader = styled(TypoH3)`
  margin-top: -36px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;

const AllocationHeader = styled(TypoSubheader)<{ index: number }>`
  color: ${({ theme }) => theme.newColors.primaryDark};

  /** first section should have a different margin as it's adjecent to page header. */
  margin: ${(props) => (props.index ? "37px 0 30px" : "32px 0 10px")};
`;

const AllocationCheckboxContainer = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  margin: 24px 0;
  padding: 12px;
  box-shadow: inset 0px 0px 0px 1px ${({ theme }) => theme.newColors.gray30};
  background-color: ${({ theme }) => theme.newColors.white100};
`;

const StyledModalInfoIcon = styled(ModalInfoIcon)`
  margin-left: 8px;
`;

const getAllocationFormikValue =
  (values: unknown[]) => (parentIndex: number, index: number) =>
    get(values, `${parentIndex}.funds.${index}.allocationValue`, "");

const getAllocationFormikAmount =
  (values: unknown[]) => (parentIndex: number, index: number) =>
    get(values, `${parentIndex}.funds.${index}.allocationAmount`, "");

const getGuaranteeValue =
  (values: unknown[]) => (parentIndex: number, index: number) =>
    get(values, `${parentIndex}.funds.${index}.guarantee.guaranteeValue`, "");

export const AllocationSection: React.FC<IProps> = ({
  values,
  name,
  errors,
  setFieldValue,
}) => {
  const intl = useIntl();

  const getAllocationValue = getAllocationFormikValue(values);
  const getAllocationError = getAllocationFormikValue(errors);
  const getAllocationAmount = getAllocationFormikAmount(values);
  const getGuaranteeValueError = getGuaranteeValue(errors);

  const getValidationInfoTrKeys = (key?: string) =>
    key ? [{ trKey: `calculator.validation.fundContributions.${key}` }] : [];

  const handlePercentInputChange =
    (parentIndex: number, fundIndex: number) => (value: string) => {
      const baseName = `${name}.${parentIndex}.funds.${fundIndex}`;

      setFieldValue(`${baseName}.allocationValue`, value);
      setFieldValue(`${baseName}.allocationAmount`, "");

      if (!parseInt(value, 10)) {
        setFieldValue(`${baseName}.guarantee.guaranteeChecked`, false);
        setFieldValue(`${baseName}.guarantee.guaranteeValue`, "");
      }
    };

  return (
    <>
      <AllocationSectionHeader>
        {intl.formatMessage({ id: "calculator.contributionAllocation" })}
        <StyledModalInfoIcon
          width={20}
          modalContent={intl.formatMessage(
            { id: "calculator.allocationTooltip" },
            { br: <br /> }
          )}
        />
      </AllocationSectionHeader>
      {values.map((fundContribution, index) =>
        fundContribution.funds?.length ? (
          <React.Fragment key={fundContribution.code}>
            <AllocationHeader index={index}>
              {intl.formatMessage({
                id: `calculator.riskProfiles.${fundContribution.code}`,
              })}
            </AllocationHeader>
            <AllocationSectionBody>
              {fundContribution.funds.map((fund, fundIndex) => (
                <AllocationGridRow key={fund.fundName}>
                  <PercentInput
                    value={getAllocationValue(index, fundIndex)}
                    onChange={handlePercentInputChange(index, fundIndex)}
                    isInvalid={!!getAllocationError(index, fundIndex)}
                    placeholder="%"
                    labelProps={{
                      validationInfoTrKeys: getValidationInfoTrKeys(
                        getAllocationError(index, fundIndex)
                      ),
                      labelText: fund.fundName,
                    }}
                    validationInfoCss={{ height: "12px" }}
                  />
                  <CurrencyInput
                    value={getAllocationAmount(index, fundIndex)}
                    onChange={() => {}}
                    readOnly
                    disabled
                    textAlign={ETextAlign.left}
                    labelProps={{
                      labelText: intl.formatMessage({
                        id: "calculator.allocationSum",
                      }),
                    }}
                    validationInfoCss={{ height: "12px" }}
                    fractional
                  />
                  <div />
                  {!!fund.guarantee?.guaranteeCode && (
                    <>
                      <AllocationCheckboxContainer>
                        <PruCheckbox
                          onChange={(checked) =>
                            setFieldValue(
                              `${name}.${index}.funds.${fundIndex}.guarantee.guaranteeChecked`,
                              checked
                            )
                          }
                          disabled={
                            !Number(getAllocationValue(index, fundIndex))
                          }
                          checked={fund.guarantee.guaranteeChecked}
                          labelProps={{
                            labelText: fund.guarantee?.guaranteeName,
                          }}
                          hideValidationInfo
                        />
                      </AllocationCheckboxContainer>
                      {fund.guarantee.guaranteeChecked && (
                        <Select
                          labelProps={{
                            labelText: intl.formatMessage({
                              id: "calculator.riskProfiles.guaranteePercent",
                            }),
                            validationInfoTrKeys: getValidationInfoTrKeys(
                              getGuaranteeValueError(index, fundIndex)
                            ),
                          }}
                          disabled={
                            !Number(getAllocationValue(index, fundIndex))
                          }
                          onChange={(value) =>
                            setFieldValue(
                              `${name}.${index}.funds.${fundIndex}.guarantee.guaranteeValue`,
                              value
                            )
                          }
                          isInvalid={!!getGuaranteeValueError(index, fundIndex)}
                          value={fund.guarantee.guaranteeValue}
                          options={fund.guarantee.guaranteePercentageAvailable.map(
                            (percent) => ({
                              value: percent,
                              text: intl.formatMessage(
                                { id: "calculator.riskProfile.allocationSum" },
                                { percent }
                              ),
                            })
                          )}
                        />
                      )}
                    </>
                  )}
                </AllocationGridRow>
              ))}
            </AllocationSectionBody>
          </React.Fragment>
        ) : null
      )}
    </>
  );
};
