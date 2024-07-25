import { Brand } from "slices/auth";
// TODO:
export const mapAgentPositionToPositionName = (
  brand: Brand,
  position?: string
) => {
  switch (position) {
    case "1-SKS":
    case "1-SKR":
    case "1-KS":
    case "1-KR":
    case "1-SMZ":
      return brand === Brand.BrandPP
        ? "agent.position.consultant"
        : "agent.position.mla.consultant";
    case "2-MZ":
      return "agent.position.manager";
    case "3-DA":
      return "agent.position.director";
    case "4-SDA":
      return "agent.position.seniorDirector";
    default:
      return "agent.position.agent";
  }
};
