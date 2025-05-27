import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('peliculas')
  obtenerPeliculas(
    @Query('sort_by') sort_by?: string,
    @Query('page') page?: number,
  ): any {
    // Si no se pasó ningún parámetro
    if (!sort_by && !page) {
      return this.appService.obtenerPeliculas('popularity.desc', 1);
    }

    // Si solo se pasó sort_by
    if (sort_by && !page) {
      return this.appService.obtenerPeliculas(sort_by, 1);
    }

    // Si solo se pasó page
    if (!sort_by && page) {
      return this.appService.obtenerPeliculas('popularity.desc', page);
    }

    // Si se pasaron ambos
    return this.appService.obtenerPeliculas(sort_by, page);
  }

  @Get('peliculas/:id')
  obtenerPelicula(@Param('id') id: string): any {
    return this.appService.obtenerPelicula(id);
  }
}
