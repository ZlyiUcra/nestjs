import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import type { AuthResponse } from './interfaces/auth-response.interface';
import type { ArtistResponse } from './interfaces/artist.interface';

@Injectable()
export class SpotifyService {
  private accessToken: string | null;
  private tokenExpiry: number = 0;

  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.CLIENT_ID = configService.getOrThrow<string>('SPOTIFY_CLIENT_ID');
    this.CLIENT_SECRET = configService.getOrThrow<string>('SPOTIFY_CLIENT_SECRET');
  }

  public async getArtist(id: string): Promise<ArtistResponse> {
    await this.authenticate();
    const { data } = await firstValueFrom(
      this.httpService
        .get<ArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .pipe(catchError((error: AxiosError) => this.rethrow(error))),
    );
    return data;
  }

  private async authenticate(): Promise<void> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return;
    }
    const credentials = Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64');

    const { data } = await firstValueFrom(
      this.httpService
        .post<AuthResponse>(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({ grant_type: 'client_credentials' }),
          {
            headers: {
              Authorization: `Basic ${credentials}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .pipe(catchError((error: AxiosError) => this.rethrow(error))),
    );
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + data.expires_in * 1000;
  }

  private rethrow(error: AxiosError): never {
    const status = error.response?.status ?? 500;
    const body = error.response?.data;
    const message = typeof body === 'string' ? body : (body ?? error.message);
    throw new HttpException(message as string | Record<string, unknown>, status);
  }
}
