type Mode = 'adaptive' | 'exact';

/**
 * 'That Feels Weird, But I'll Allow It'
 * https://github.com/callstack/react-native-paper/issues/1835#issuecomment-644113593
 * https://github.com/callstack/react-native-paper/blob/main/example/src/index.tsx#L19
 */
declare global {
  namespace ReactNativePaper {
    interface ThemeFont {
      fontFamily: string;
      fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900';
    }
    interface ThemeFonts {
      regular: ThemeFont;
      medium: ThemeFont;
      light: ThemeFont;
      thin: ThemeFont;
    }
    interface ThemeColors {
      primary: string;
      background: string;
      surface: string;
      accent: string;
      error: string;
      text: string;
      onSurface: string;
      disabled: string;
      placeholder: string;
      backdrop: string;
      notification: string;
      onBackground100?: string;
      onBackground50?: string;
      onBackground20?: string;
      onBackground10?: string;
      onBackgroundAlpha35?: string;
      text50?: string;
      yellow?: string;
      green?: string;
      accent?: string;
      text?: string;
      disabled?: string;
      placeholder?: string;
      notification?: string;
    }

    interface ThemeAnimation {
      scale: number;
    }

    interface Theme {
      dark: boolean;
      mode?: Mode;
      roundness: number;
      colors: ThemeColors;
      fonts: ThemeFonts;
      animation: ThemeAnimation;
    }
  }
}

export {};
