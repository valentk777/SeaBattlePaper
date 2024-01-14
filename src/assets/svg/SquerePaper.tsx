import * as React from "react"
import Svg, { Path } from "react-native-svg"
import CustomSvgProps, { SetDefaultColorIfNull } from "../CustomSvgProps";
import { View } from "react-native-reanimated/lib/typescript/Animated";

const SquerePaper = (props: CustomSvgProps) => {

    const { backgroundColor, primaryColor, secondaryColor, borderColor } = SetDefaultColorIfNull(props);

    return (
        <Svg
            viewBox="0 0 1682.98 3098.83"
            {...props}
        >
            <Path fill={primaryColor} d="M1682.98.5l-7.9 3098.33L0 3098.33 7.9 0l1675.08.5zm-11.34 3094.32L1679.51 4.5 11.34 4 3.47 3094.33l1668.17.5z" />
            <Path fill={primaryColor} d="M1588.05 3096.8L1595.93 2.48 1599.39 2.48 1591.5 3096.81 1588.05 3096.8z" />
            <Path fill={primaryColor} d="M1504.46 3096.78L1512.35 2.45 1515.81 2.45 1507.92 3096.78 1504.46 3096.78z" />
            <Path fill={primaryColor} d="M1420.88 3096.75L1428.77 2.43 1432.23 2.43 1424.34 3096.76 1420.88 3096.75z" />
            <Path fill={primaryColor} d="M1337.3 3096.73L1345.19 2.4 1348.64 2.4 1340.76 3096.73 1337.3 3096.73z" />
            <Path fill={primaryColor} d="M1253.72 3096.7L1261.61 2.38 1265.06 2.38 1257.18 3096.71 1253.72 3096.7z" />
            <Path fill={primaryColor} d="M1170.14 3096.68L1178.03 2.35 1181.48 2.35 1173.6 3096.68 1170.14 3096.68z" />
            <Path fill={primaryColor} d="M1086.56 3096.65L1094.45 2.33 1097.9 2.33 1090.01 3096.66 1086.56 3096.65z" />
            <Path fill={primaryColor} d="M1002.98 3096.63L1010.87 2.3 1014.32 2.3 1006.43 3096.63 1002.98 3096.63z" />
            <Path fill={primaryColor} d="M919.4 3096.6L927.28 2.28 930.74 2.28 922.85 3096.61 919.4 3096.6z" />
            <Path fill={primaryColor} d="M835.82 3096.58L843.7 2.25 847.16 2.25 839.27 3096.58 835.82 3096.58z" />
            <Path fill={primaryColor} d="M752.24 3096.55L760.12 2.23 763.58 2.23 755.69 3096.55 752.24 3096.55z" />
            <Path fill={primaryColor} d="M668.65 3096.53L676.54 2.2 680 2.2 672.11 3096.53 668.65 3096.53z" />
            <Path fill={primaryColor} d="M585.07 3096.5L592.96 2.18 596.42 2.18 588.53 3096.5 585.07 3096.5z" />
            <Path fill={primaryColor} d="M501.49 3096.48L509.38 2.15 512.83 2.15 504.95 3096.48 501.49 3096.48z" />
            <Path fill={primaryColor} d="M417.91 3096.45L425.8 2.13 429.25 2.13 421.37 3096.45 417.91 3096.45z" />
            <Path fill={primaryColor} d="M334.33 3096.43L342.22 2.1 345.67 2.1 337.79 3096.43 334.33 3096.43z" />
            <Path fill={primaryColor} d="M250.75 3096.4L258.64 2.08 262.09 2.08 254.2 3096.4 250.75 3096.4z" />
            <Path fill={primaryColor} d="M167.17 3096.38L175.05 2.05 178.51 2.05 170.62 3096.38 167.17 3096.38z" />
            <Path fill={primaryColor} d="M83.59 3096.35L91.47 2.03 94.93 2.03 87.04 3096.35 83.59 3096.35z" />
            <Path fill={primaryColor} d="M9.38 97.77L9.39 93.77 1681.01 94.27 1681 98.27 9.38 97.77z" />
            <Path fill={primaryColor} d="M9.14 191.54L9.15 187.53 1680.77 188.04 1680.76 192.04 9.14 191.54z" />
            <Path fill={primaryColor} d="M8.9 285.31L8.91 281.3 1680.53 281.8 1680.52 285.81 8.9 285.31z" />
            <Path fill={primaryColor} d="M8.66 379.07L8.67 375.07 1680.29 375.57 1680.28 379.58 8.66 379.07z" />
            <Path fill={primaryColor} d="M8.42 472.84L8.43 468.84 1680.05 469.34 1680.04 473.34 8.42 472.84z" />
            <Path fill={primaryColor} d="M8.18 566.61L8.19 562.61 1679.81 563.11 1679.8 567.11 8.18 566.61z" />
            <Path fill={primaryColor} d="M7.94 660.38L7.95 656.37 1679.57 656.87 1679.56 660.88 7.94 660.38z" />
            <Path fill={primaryColor} d="M7.7 754.14L7.71 750.14 1679.33 750.64 1679.32 754.64 7.7 754.14z" />
            <Path fill={primaryColor} d="M7.46 847.91L7.47 843.91 1679.1 844.41 1679.09 848.41 7.46 847.91z" />
            <Path fill={primaryColor} d="M7.23 941.68L7.24 937.67 1678.86 938.17 1678.85 942.18 7.23 941.68z" />
            <Path fill={primaryColor} d="M6.99 1035.44L7 1031.44 1678.62 1031.94 1678.61 1035.95 6.99 1035.44z" />
            <Path fill={primaryColor} d="M6.75 1129.21L6.76 1125.21 1678.38 1125.71 1678.37 1129.72 6.75 1129.21z" />
            <Path fill={primaryColor} d="M6.51 1222.98L6.52 1218.98 1678.14 1219.48 1678.13 1223.48 6.51 1222.98z" />
            <Path fill={primaryColor} d="M6.27 1316.75L6.28 1312.75 1677.9 1313.25 1677.89 1317.25 6.27 1316.75z" />
            <Path fill={primaryColor} d="M6.03 1410.52L6.04 1406.51 1677.66 1407.01 1677.65 1411.02 6.03 1410.52z" />
            <Path fill={primaryColor} d="M5.79 1504.28L5.8 1500.28 1677.42 1500.78 1677.41 1504.78 5.79 1504.28z" />
            <Path fill={primaryColor} d="M5.55 1598.05L5.56 1594.05 1677.18 1594.55 1677.17 1598.55 5.55 1598.05z" />
            <Path fill={primaryColor} d="M5.31 1691.82L5.32 1687.81 1676.94 1688.31 1676.93 1692.32 5.31 1691.82z" />
            <Path fill={primaryColor} d="M5.07 1785.59L5.08 1781.58 1676.71 1782.08 1676.7 1786.09 5.07 1785.59z" />
            <Path fill={primaryColor} d="M4.84 1879.35L4.85 1875.35 1676.47 1875.85 1676.46 1879.85 4.84 1879.35z" />
            <Path fill={primaryColor} d="M4.6 1973.12L4.61 1969.12 1676.23 1969.62 1676.22 1973.62 4.6 1973.12z" />
            <Path fill={primaryColor} d="M4.36 2066.89L4.37 2062.89 1675.99 2063.39 1675.98 2067.39 4.36 2066.89z" />
            <Path fill={primaryColor} d="M4.12 2160.66L4.13 2156.65 1675.75 2157.15 1675.74 2161.16 4.12 2160.66z" />
            <Path fill={primaryColor} d="M3.88 2254.42L3.89 2250.42 1675.51 2250.92 1675.5 2254.92 3.88 2254.42z" />
            <Path fill={primaryColor} d="M3.64 2348.19L3.65 2344.19 1675.27 2344.69 1675.26 2348.69 3.64 2348.19z" />
            <Path fill={primaryColor} d="M3.4 2441.96L3.41 2437.95 1675.03 2438.46 1675.02 2442.46 3.4 2441.96z" />
            <Path fill={primaryColor} d="M3.16 2535.73L3.17 2531.72 1674.79 2532.22 1674.78 2536.23 3.16 2535.73z" />
            <Path fill={primaryColor} d="M2.92 2629.49L2.93 2625.49 1674.55 2625.99 1674.54 2629.99 2.92 2629.49z" />
            <Path fill={primaryColor} d="M2.68 2723.26L2.69 2719.25 1674.32 2719.76 1674.31 2723.76 2.68 2723.26z" />
            <Path fill={primaryColor} d="M2.45 2817.03L2.46 2813.03 1674.08 2813.53 1674.07 2817.53 2.45 2817.03z" />
            <Path fill={primaryColor} d="M2.21 2910.8L2.22 2906.79 1673.84 2907.29 1673.83 2911.3 2.21 2910.8z" />
            <Path fill={primaryColor} d="M1.97 3004.56L1.98 3000.56 1673.6 3001.06 1673.59 3005.06 1.97 3004.56z" />
        </Svg>
    )
}

export default SquerePaper
