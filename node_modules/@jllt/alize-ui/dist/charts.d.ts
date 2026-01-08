import * as React from 'react';
import Highcharts from 'highcharts';

/**
 * Get the best text color (white or dark) for a given background color
 * Uses WCAG AA standard (4.5:1 for normal text)
 * @param backgroundColor - Hex color of the background
 * @param darkColor - Dark text color option (default: #0e1d23)
 * @param lightColor - Light text color option (default: #ffffff)
 */
declare function getContrastTextColor(backgroundColor: string, darkColor?: string, lightColor?: string): string;
/**
 * Generate a sequential color palette from a base color
 * Creates shades from light (low intensity) to dark (high intensity)
 * @param baseColor - The base hex color
 * @param steps - Number of steps in the palette (default 7)
 */
declare function generateSequentialPalette(baseColor: string, steps?: number): string[];
/**
 * Alize dataviz theme colors for Highcharts
 * Uses semantic dataviz tokens for consistent theming
 */
interface AlizeChartColors {
    /** Categorical palette (10 colors) for discrete categories */
    categorical: string[];
    /** No data color */
    noData: string;
    /** RAG colors (danger, warning, success) with weak/medium/strong variants */
    rag: {
        danger: {
            weak: string;
            medium: string;
            strong: string;
        };
        warning: {
            weak: string;
            medium: string;
            strong: string;
        };
        success: {
            weak: string;
            medium: string;
            strong: string;
        };
    };
    /** UI colors from semantic tokens */
    text: string;
    textSubdued: string;
    grid: string;
    axis: string;
    background: string;
    tooltipBackground: string;
}
/**
 * Hook to get Alize dataviz theme colors for Highcharts
 * Reads CSS variables and returns color values
 */
declare function useAlizeChartColors(): AlizeChartColors;
/**
 * Hook to generate a sequential palette from a categorical color
 * @param colorIndex - Index of the categorical color (1-10)
 * @param steps - Number of steps in the palette (default 7)
 */
declare function useSequentialPalette(colorIndex?: number, steps?: number): string[];
/**
 * Generate a divergent palette from two base colors
 * Center is a light blend of both colors (not gray), extremes are saturated
 * @param negativeColor - Color for negative values (left side)
 * @param positiveColor - Color for positive values (right side)
 * @param _neutralColor - Unused, kept for API compatibility
 * @param steps - Total number of steps (should be odd, default 7)
 */
declare function generateDivergentPalette(negativeColor: string, positiveColor: string, _neutralColor: string, steps?: number): string[];
/**
 * Divergent palette colors interface
 */
interface DivergentColors {
    negative: string;
    positive: string;
    neutral: string;
}
/**
 * Hook to get divergent palette base colors from CSS variables
 * Uses Ocean for negative and Orange for positive
 */
declare function useDivergentColors(): DivergentColors;
/**
 * Hook to generate a divergent palette
 * Uses Ocean for negative values and Orange for positive values
 * @param steps - Total number of steps (should be odd, default 7)
 */
declare function useDivergentPalette(steps?: number): string[];
/**
 * Generate Highcharts theme options based on Alize dataviz tokens
 */
declare function useHighchartsTheme(): Highcharts.Options;
/**
 * Highchart component props interface
 */
interface HighchartProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Highcharts configuration options */
    options: Highcharts.Options;
    /** Whether to update the chart immutably */
    immutable?: boolean;
    /** Whether to allow chart update */
    allowChartUpdate?: boolean;
    /** Callback when chart is created */
    callback?: (chart: Highcharts.Chart) => void;
    /** Container props */
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
}
/**
 * Highchart component - A wrapper around Highcharts for React
 *
 * Provides a themed Highcharts instance with Alize design system integration.
 * Automatically applies semantic dataviz tokens for consistent styling.
 *
 * @param props - Highchart props including options and container attributes
 * @returns A Highcharts chart element
 *
 * @example
 * ```tsx
 * const options = {
 *   chart: { type: 'line' },
 *   series: [{ data: [1, 2, 3, 4, 5] }]
 * };
 * <Highchart options={options} className="h-64" />
 * ```
 */
declare function Highchart({ className, options, immutable, allowChartUpdate, callback, containerProps, ...props }: HighchartProps): React.ReactElement;

export { type AlizeChartColors, type DivergentColors, Highchart, type HighchartProps, generateDivergentPalette, generateSequentialPalette, getContrastTextColor, useAlizeChartColors, useDivergentColors, useDivergentPalette, useHighchartsTheme, useSequentialPalette };
