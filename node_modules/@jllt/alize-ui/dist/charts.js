"use client";
import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import HighchartsTreemap from 'highcharts/modules/treemap';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx } from 'react/jsx-runtime';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var modulesInitialized = false;
function initHighchartsModules() {
  if (modulesInitialized || typeof window === "undefined") return;
  try {
    const initMore = HighchartsMore;
    const initHeatmap = HighchartsHeatmap;
    const initTreemap = HighchartsTreemap;
    const initSolidGauge = HighchartsSolidGauge;
    if (typeof initMore === "function") initMore(Highcharts);
    if (typeof initHeatmap === "function") initHeatmap(Highcharts);
    if (typeof initTreemap === "function") initTreemap(Highcharts);
    if (typeof initSolidGauge === "function") initSolidGauge(Highcharts);
    modulesInitialized = true;
  } catch (e) {
    console.warn("Failed to initialize Highcharts modules:", e);
  }
}
if (typeof window !== "undefined") {
  initHighchartsModules();
}
function getCSSVariable(name) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 1;
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function getContrastTextColor(backgroundColor, darkColor = "#0e1d23", lightColor = "#ffffff") {
  const contrastWithDark = getContrastRatio(backgroundColor, darkColor);
  const contrastWithLight = getContrastRatio(backgroundColor, lightColor);
  return contrastWithLight > contrastWithDark ? lightColor : darkColor;
}
function generateSequentialPalette(baseColor, steps = 7) {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return Array(steps).fill(baseColor);
  const palette = [];
  for (let i = 0; i < steps; i++) {
    const progress = i / (steps - 1);
    const lightness = 1 - progress * 0.85;
    const r = Math.round(rgb.r + (255 - rgb.r) * lightness * (1 - progress * 0.3));
    const g = Math.round(rgb.g + (255 - rgb.g) * lightness * (1 - progress * 0.3));
    const b = Math.round(rgb.b + (255 - rgb.b) * lightness * (1 - progress * 0.3));
    palette.push(rgbToHex(r, g, b));
  }
  return palette;
}
function useAlizeChartColors() {
  const [colors, setColors] = React.useState({
    categorical: [
      "#aa9888",
      "#3e778b",
      "#6ea2b3",
      "#674467",
      "#7da57e",
      "#584e47",
      "#c08e91",
      "#375837",
      "#b68eb5",
      "#919da2"
    ],
    noData: "#d1d5dc",
    rag: {
      danger: { weak: "#e47a95", medium: "#922842", strong: "#751b31" },
      warning: { weak: "#e77f45", medium: "#8d3301", strong: "#6d2800" },
      success: { weak: "#12b168", medium: "#065c3c", strong: "#054732" }
    },
    text: "#0e1d23",
    textSubdued: "#5d7078",
    grid: "#dce2e5",
    axis: "#cad1d5",
    background: "transparent",
    tooltipBackground: "#ffffff"
  });
  React.useEffect(() => {
    const updateColors = () => {
      const categorical = [];
      for (let i = 1; i <= 10; i++) {
        const color = getCSSVariable(`--semantic-dataviz-ct-${i}`);
        if (color) categorical.push(color);
      }
      setColors({
        categorical: categorical.length === 10 ? categorical : colors.categorical,
        noData: getCSSVariable("--semantic-dataviz-ct-nodata") || "#d1d5dc",
        rag: {
          danger: {
            weak: getCSSVariable("--semantic-dataviz-rag-dangerweak") || "#e47a95",
            medium: getCSSVariable("--semantic-dataviz-rag-dangermedium") || "#922842",
            strong: getCSSVariable("--semantic-dataviz-rag-dangerstrong") || "#751b31"
          },
          warning: {
            weak: getCSSVariable("--semantic-dataviz-rag-warningweak") || "#e77f45",
            medium: getCSSVariable("--semantic-dataviz-rag-warningmedium") || "#8d3301",
            strong: getCSSVariable("--semantic-dataviz-rag-warningstrong") || "#6d2800"
          },
          success: {
            weak: getCSSVariable("--semantic-dataviz-rag-successweak") || "#12b168",
            medium: getCSSVariable("--semantic-dataviz-rag-successmedium") || "#065c3c",
            strong: getCSSVariable("--semantic-dataviz-rag-successstrong") || "#054732"
          }
        },
        // UI colors from existing semantic tokens
        text: getCSSVariable("--semantic-text-default") || "#0e1d23",
        textSubdued: getCSSVariable("--semantic-text-subdued") || "#5d7078",
        grid: getCSSVariable("--semantic-stroke-subdued") || "#dce2e5",
        axis: getCSSVariable("--semantic-stroke-default") || "#cad1d5",
        background: "transparent",
        tooltipBackground: getCSSVariable("--semantic-surface-default") || "#ffffff"
      });
    };
    updateColors();
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"]
    });
    return () => observer.disconnect();
  }, []);
  return colors;
}
function useSequentialPalette(colorIndex = 1, steps = 7) {
  const colors = useAlizeChartColors();
  return React.useMemo(() => {
    const baseColor = colors.categorical[Math.min(Math.max(colorIndex - 1, 0), 9)];
    return generateSequentialPalette(baseColor, steps);
  }, [colors.categorical, colorIndex, steps]);
}
function generateDivergentPalette(negativeColor, positiveColor, _neutralColor, steps = 7) {
  const negRgb = hexToRgb(negativeColor);
  const posRgb = hexToRgb(positiveColor);
  if (!negRgb || !posRgb) {
    return Array(steps).fill(negativeColor);
  }
  const palette = [];
  const midpoint = Math.floor(steps / 2);
  const centerR = Math.round((negRgb.r + posRgb.r) / 2 * 0.4 + 255 * 0.6);
  const centerG = Math.round((negRgb.g + posRgb.g) / 2 * 0.4 + 255 * 0.6);
  const centerB = Math.round((negRgb.b + posRgb.b) / 2 * 0.4 + 255 * 0.6);
  for (let i = 0; i < steps; i++) {
    if (i < midpoint) {
      const progress = i / midpoint;
      const lightenAmount = progress * 0.7;
      const r = Math.round(negRgb.r + (255 - negRgb.r) * lightenAmount);
      const g = Math.round(negRgb.g + (255 - negRgb.g) * lightenAmount);
      const b = Math.round(negRgb.b + (255 - negRgb.b) * lightenAmount);
      palette.push(rgbToHex(r, g, b));
    } else if (i === midpoint) {
      palette.push(rgbToHex(centerR, centerG, centerB));
    } else {
      const progress = (i - midpoint) / (steps - midpoint - 1);
      const lightenAmount = (1 - progress) * 0.7;
      const r = Math.round(posRgb.r + (255 - posRgb.r) * lightenAmount);
      const g = Math.round(posRgb.g + (255 - posRgb.g) * lightenAmount);
      const b = Math.round(posRgb.b + (255 - posRgb.b) * lightenAmount);
      palette.push(rgbToHex(r, g, b));
    }
  }
  return palette;
}
function useDivergentColors() {
  const [colors, setColors] = React.useState({
    negative: "#3e778b",
    // ocean-600
    positive: "#be4501",
    // orange-500
    neutral: "#cad1d5"
    // glacier-300
  });
  React.useEffect(() => {
    const updateColors = () => {
      setColors({
        negative: getCSSVariable("--color-solstice-ocean-600") || "#3e778b",
        positive: getCSSVariable("--color-solstice-orange-500") || "#be4501",
        neutral: getCSSVariable("--color-solstice-glacier-300") || "#cad1d5"
      });
    };
    updateColors();
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"]
    });
    return () => observer.disconnect();
  }, []);
  return colors;
}
function useDivergentPalette(steps = 7) {
  const colors = useDivergentColors();
  return React.useMemo(() => {
    return generateDivergentPalette(colors.negative, colors.positive, colors.neutral, steps);
  }, [colors.negative, colors.positive, colors.neutral, steps]);
}
function useHighchartsTheme() {
  const colors = useAlizeChartColors();
  return React.useMemo(
    () => ({
      colors: colors.categorical,
      chart: {
        backgroundColor: colors.background,
        style: {
          fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif"
        }
      },
      title: {
        style: {
          color: colors.text,
          fontSize: "16px",
          fontWeight: "500"
        }
      },
      subtitle: {
        style: {
          color: colors.textSubdued,
          fontSize: "14px"
        }
      },
      xAxis: {
        gridLineColor: colors.grid,
        lineColor: colors.axis,
        tickColor: colors.axis,
        labels: {
          style: {
            color: colors.textSubdued,
            fontSize: "12px"
          }
        },
        title: {
          style: {
            color: colors.text,
            fontSize: "12px"
          }
        }
      },
      yAxis: {
        gridLineColor: colors.grid,
        lineColor: colors.axis,
        tickColor: colors.axis,
        labels: {
          style: {
            color: colors.textSubdued,
            fontSize: "12px"
          }
        },
        title: {
          style: {
            color: colors.text,
            fontSize: "12px"
          }
        }
      },
      legend: {
        itemStyle: {
          color: colors.text,
          fontSize: "12px",
          fontWeight: "400"
        },
        itemHoverStyle: {
          color: colors.categorical[0]
        }
      },
      tooltip: {
        backgroundColor: colors.tooltipBackground,
        borderColor: colors.grid,
        borderRadius: 8,
        style: {
          color: colors.text,
          fontSize: "12px"
        },
        shadow: {
          color: "rgba(0, 0, 0, 0.1)",
          offsetX: 0,
          offsetY: 4,
          width: 8
        }
      },
      plotOptions: {
        series: {
          borderRadius: 0,
          borderWidth: 0,
          animation: {
            duration: 500
          },
          dataLabels: {
            style: {
              color: colors.text,
              textOutline: "none",
              fontWeight: "400",
              fontSize: "11px"
            }
          }
        },
        column: {
          borderRadius: 0,
          borderWidth: 0
        },
        bar: {
          borderRadius: 0,
          borderWidth: 0
        },
        pie: {
          borderRadius: 0,
          borderWidth: 0
        },
        area: {
          lineWidth: 2,
          fillOpacity: 0.3
        },
        line: {
          lineWidth: 2
        },
        spline: {
          lineWidth: 2
        }
      },
      credits: {
        enabled: false
      }
    }),
    [colors]
  );
}
function Highchart(_a) {
  var _b = _a, {
    className,
    options,
    immutable = false,
    allowChartUpdate = true,
    callback,
    containerProps
  } = _b, props = __objRest(_b, [
    "className",
    "options",
    "immutable",
    "allowChartUpdate",
    "callback",
    "containerProps"
  ]);
  const theme = useHighchartsTheme();
  const chartRef = React.useRef(null);
  React.useEffect(() => {
    initHighchartsModules();
  }, []);
  const mergedOptions = React.useMemo(
    () => Highcharts.merge(theme, options),
    [theme, options]
  );
  return /* @__PURE__ */ jsx(
    "div",
    __spreadProps(__spreadValues({
      "data-slot": "highchart",
      className: cn("w-full", className)
    }, props), {
      children: /* @__PURE__ */ jsx(
        HighchartsReact,
        {
          ref: chartRef,
          highcharts: Highcharts,
          options: mergedOptions,
          immutable,
          allowChartUpdate,
          callback,
          containerProps
        }
      )
    })
  );
}

export { Highchart, generateDivergentPalette, generateSequentialPalette, getContrastTextColor, useAlizeChartColors, useDivergentColors, useDivergentPalette, useHighchartsTheme, useSequentialPalette };
