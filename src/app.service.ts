import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Fondo de Pantalla Completa</title>
          <style>
              body, html {
                  height: 100%;
                  margin: 0;
              }
              .background {
                  background-image: url('https://www.kuroro.com/build/_assets/bb-poster-square-BBNXDVUH.png');
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover;
                  height: 100%;
              }
          </style>
      </head>
      <body class="background">
      </body>
      </html>
    `;
  }
  
}
