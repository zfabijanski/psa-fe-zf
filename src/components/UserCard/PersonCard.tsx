import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import profilePlacePlaceholder from "../../assets/newIcons/avatar.svg";
import { useGetAgentQuery } from "slices/auth";

const ProfilePhotoDiv = styled.div`
  width: 100px;
  height: 100px;
  margin: 48px auto 24px;
  background-color: ${({ theme }) => theme.newColors.white100};
  border-radius: 50%;
`;

const ProfilePhotoImg = styled.img`
  border-radius: 50%;
  width: 100px;
  border: 4px solid ${({ theme }) => theme.newColors.primary100};
`;

const ConsultantFullname = styled.p`
  font-size: 24px;
  font-weight: 600;
  font-stretch: normal;
  line-height: 28px;
  text-align: center;
  color: ${({ theme }) => theme.newColors.gray100};
  margin-bottom: 0;
`;

const ConsultantTitle = styled.p`
  font-size: 14px;
  font-stretch: normal;
  line-height: 20px;
  text-align: center;
  color: ${({ theme }) => theme.newColors.primary100};
  margin-top: 4px;
  white-space: pre-wrap;
`;

export const PersonCard = () => {
  const {
    picturePath,
    pictureApiPath: image,
    position: title,
    fullName,
  } = useGetAgentQuery().data ?? {};

  const hasImage = !!picturePath;

  return (
    <div>
      <ProfilePhotoDiv>
        {hasImage ? (
          <ProfilePhotoImg src={image} alt="profile-avatar" />
        ) : (
          <img src={profilePlacePlaceholder} alt="profile-avatar-placeholder" />
        )}
      </ProfilePhotoDiv>
      <ConsultantFullname>{fullName}</ConsultantFullname>
      <ConsultantTitle>
        <FormattedMessage id={title} />
      </ConsultantTitle>
    </div>
  );
};

export default PersonCard;
