declare var __BUILD__: string

export default {
  appTitle: 'My Application',
  color: {
    text: '#333',
    back: '#fff',
    dim1: 'gainsboro',
    dim2: '#ccd',
    dim3: '#66f'
  },
  border: {
    thin: '1px solid #33d'
  },
  copyright: '© 2019 Some Entity',
  version: '0.1.' + __BUILD__
}