module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@assets': './assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@containers': './src/containers',
          '@hooks': './src/hooks',
          '@routes': './src/routes',
          '@state': './src/state',
          '@utils': './src/utils',
          '@views': './src/views',
        },
      },
    ],
  ],
};
