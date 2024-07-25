import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Footer from "../../layouts/components/Footer/Footer";
import ErrorMessage from "../../components/UI/ErrorMessage";
import PageLayout from "../../layouts/PageLayout";
import { RootState } from "../../AppStore";

const LandingHeader = styled.p`
  font-size: 28px;
  font-stretch: normal;
  line-height: 1.07;
  text-align: center;
  color: ${({ theme }) => theme.newColors.gray100};
  margin: 80px 0 70px 0;
`;

const CenteredDiv = styled.div`
  text-align: center;
  width: 202px;
  margin: 0 auto 10px auto;
`;

interface IProps {
  loginFailed: boolean;
}

const Landing: React.FC<IProps> = ({ loginFailed }) => {
  return (
    <PageLayout footer={<Footer />} navigationHidden={true}>
      {loginFailed && (
        <CenteredDiv>
          <LandingHeader>
            <ErrorMessage message="Nie udało się uruchomić aplikacji. Jeżeli potrzebujesz pomocy skontaktuj się z help-desk pod numerem: 459-595-100." />
          </LandingHeader>
        </CenteredDiv>
      )}
    </PageLayout>
  );
};

const mapStateToProps = ({ auth }: RootState) => ({
  loginFailed: auth.loginFailed,
});

export default connect(mapStateToProps)(Landing);
