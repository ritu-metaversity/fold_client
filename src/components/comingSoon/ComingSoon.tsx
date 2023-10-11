import { StyledComing } from "../casino/styledComponent";
import Lottie from "react-lottie";
import groovyWalkAnimation from "./groovyWalkAnimation.json";

const ComingSoon = () => {
  return (
    <StyledComing>
      {/* <h4>Coming Soon ....</h4> */}
      {<Lottie options={{ animationData: groovyWalkAnimation }} />}
    </StyledComing>
  );
};

export default ComingSoon;
