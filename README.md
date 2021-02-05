<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Índice</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#tecnologias-utilizadas">Tecnologias utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#começando">Começando</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li>
      <a href="#como-usar">Como usar</a>
      <ul>
        <li><a href="#limitações">Limitações</a></li>
      </ul>
    </li>
    <li><a href="#licença">Licença</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Sobre o projeto

Conforme proposto, o projeto consiste em um aplicativo móvel que possui uma listagem de vídeos do YouTube que pode ser assistida e filtrada.

### Tecnologias utilizadas

Segue abaixo a lista de todos os pacotes utilizados na construção do aplicativo:

- [axios](https://github.com/axios/axios)
- [Day.js](https://github.com/iamkun/dayjs)
- [React Native](https://reactnative.dev/)
- [React Native Dotenv](https://github.com/goatandsheep/react-native-dotenv)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [React Native YouTube](https://github.com/davidohayon669/react-native-youtube)

<!-- GETTING STARTED -->

## Começando

### Pré-requisitos

Instale os gerenciadores de pacotes

1. npm
   ```sh
   npm install npm@latest -g
   ```
2. yarn
   ```sh
   npm install --global yarn
   ```

### Instalação

1. Crie uma chave de API do YouTube: [https://developers.google.com/youtube/v3](https://developers.google.com/youtube/v3)
2. Clone o repositório
   ```sh
   git clone https://github.com/gloredo/JalekoChallenge.git
   ```
3. Instale os pacotes NPM
   ```sh
   yarn install
   ```
4. Renomei o arquivo `.env.example` para `.env`
5. Insira sua chave de API do YouTube em `.env`
   ```ENV
   YOUTUBE_DATA_API_V3_KEY = SUA_CHAVE_AQUI;
   ```

<!-- USAGE EXAMPLES -->

## Como usar

O aplicativo é muito simples, apenas clique em um vídeo para começar a assistir. Se quiser filtrar por algum vídeo em específico, basta digitar o termo desejado no campo "Qual vídeo você quer ver?" localizado na parte superior da tela.

### Limitações

ATENÇÃO! Esse aplicativo NÃO foi testado no sistema operacional iOS, apenas no Android.

Por utilizar o [YouTube Android Player API](https://developers.google.com/youtube/android/player/), existem três limitações que podem ser notadas no aplicativo:

1. É necessário possuir o aplicativo oficial do YouTube instalado no dispositivo, caso contrário, o Player não funcionará.
2. Apenas um Player pode ser exibido de cada vez, dessa forma, é exibida a thumbnail do vídeo no lugar do Player;
3. Caso algum frame sobreponha-se ao Player, é emitido o erro `UNAUTHORIZED_OVERLAY`, que pausa o vídeo e pode ocasionar no fechamento do aplicativo. Por isso, quando o Player esta próximo do topo ou do final da tela, o Player deixa de existir e a thumbnail é exibida.

<!-- LICENSE -->

## Licença

Distribuído sobe a licença MIT. Veja o arquivo `LICENSE` para mais informações.
