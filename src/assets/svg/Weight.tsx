import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CustomSvgProps, { SetDefaultColorIfNull } from "../CustomSvgProps";

const SvgComponent = (props: CustomSvgProps) => {

  const { backgroundColor, primaryColor, secondaryColor, borderColor } = SetDefaultColorIfNull(props);

  return (
    <Svg
      viewBox="0 0 800 800"
      {...props}
    >
      <Path
        d="M537.8 366.9C383.5 333 510 119.1 298.6 136.8S-113.3 641.3 262 755.3s568.8-324.2 275.8-388.4z"
        fill={backgroundColor}
      />
      <Path
        d="M159.1 244.1H620v407.3H159.1z"
        fill={secondaryColor}
      />
      <Path
        d="M301.2 365c.4-4.5 2.4-23.8 20.7-39.2 20.4-17.3 45.6-16.5 49.9-16.3h56.4c4.3-.2 29.2-1 49.6 16 18.5 15.5 20.6 35 20.9 39.5H301.2zM290.7 427h7.4c40.7 0 73.7 28.2 73.7 63v75.6c0 34.8-33 63-73.7 63h-7.4c-40.7 0-73.7-28.2-73.7-63V490c0-34.8 33-63 73.7-63zM502.5 427h7.3c40.5 0 73.4 28.2 73.4 63v75.6c0 34.8-32.9 63-73.4 63h-7.3c-40.5 0-73.4-28.2-73.4-63V490c0-34.8 32.8-63 73.4-63z"
        fill={primaryColor}
      />
      <Path
        d="M185.6 240.1H594c17.4 0 31.4 12.4 31.4 27.8v360.8c0 15.3-14.1 27.8-31.4 27.8H185.6c-17.4 0-31.4-12.4-31.4-27.8V267.8c0-15.3 14.1-27.7 31.4-27.7z"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M279.9 406.6h7.9c43.4 0 78.5 31.1 78.5 69.4v83.3c0 38.3-35.2 69.4-78.5 69.4h-7.9c-43.4 0-78.5-31.1-78.5-69.4V476c-.1-38.3 35.1-69.4 78.5-69.4zM491.9 406.6h7.9c43.4 0 78.5 31.1 78.5 69.4v83.3c0 38.3-35.2 69.4-78.5 69.4h-7.9c-43.4 0-78.5-31.1-78.5-69.4V476c0-38.3 35.1-69.4 78.5-69.4zM248.4 267.8h282.7V365H248.4zM389.8 365l-47.1-41.7"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
      <Path
        d="M279.9 365c.4-5.7 2.7-29.8 23-49.1 22.7-21.6 50.7-20.6 55.5-20.3h62.8c4.8-.3 32.5-1.3 55.2 20 20.6 19.3 22.9 43.8 23.3 49.3-73.2.1-146.5.1-219.8.1zM594 260.9v13.9M594 621.7v13.9M185.6 621.7v13.9M185.6 260.9v13.9M531.2 413.5 413.4 517.6M562.6 434.4 413.4 566.2M578.3 469.1 429.1 600.9M578.3 517.6 460.5 621.7M578.3 559.3l-78.5 69.4M491.9 406.6 413.4 476M319.1 413.5 201.3 517.6M350.5 434.4 201.3 566.2M366.2 469.1 217 600.9M366.2 517.6 248.4 621.7M366.2 559.3l-78.5 69.4M279.9 406.6 201.3 476"
        fill="none"
        stroke={borderColor}
        strokeWidth={14}
        strokeLinejoin="round"
        strokeMiterlimit={50}
      />
    </Svg>
  )
}
export default SvgComponent
