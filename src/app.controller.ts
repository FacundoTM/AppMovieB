import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('peliculas')
  obtenerPeliculas(
    @Query('sort_by') sort_by?: string,
    @Query('page') page?: number,
    @Query('busqueda') busqueda?: string,
  ): any {
    return this.appService.obtenerPeliculas({ sort_by, page, busqueda });
  }

  @Get('peliculas/:id')
  obtenerPelicula(@Param('id') id: string): any {
    return this.appService.obtenerPelicula(id);
  }
}
