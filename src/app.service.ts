import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    // Hacemos uso de las variables de entorno.
  }

  async obtenerPeliculas({
    sort_by,
    page,
    busqueda,
  }: {
    sort_by?: string;
    page?: number;
    busqueda?: string;
  }): Promise<any> {
    const baseDiscover = 'https://api.themoviedb.org/3/discover/movie';
    const baseSearch = 'https://api.themoviedb.org/3/search/movie';

    const baseUrl = busqueda ? baseSearch : baseDiscover;

    const params = new URLSearchParams({
      include_adult: 'false',
      include_video: 'false',
      language: 'es-ES',
    });

    if (busqueda) params.append('query', busqueda);
    if (sort_by && !busqueda) params.append('sort_by', sort_by);
    if (page && !busqueda) params.append('page', page.toString());

    const url = `${baseUrl}?${params.toString()}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.configService.get('SECRET_KEY')}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      const status = error?.response?.status || 500;
      const message =
        error?.response?.data?.status_message || 'Error desconocido';

      throw new HttpException(message, status);
    }
  }

  async obtenerPelicula(id): Promise<any> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=es-ES`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.configService.get('SECRET_KEY')}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      const status = error?.response?.status || 500;
      const message =
        error?.response?.data?.status_message || 'Error desconocido';

      throw new HttpException(message, status);
    }
  }
}
