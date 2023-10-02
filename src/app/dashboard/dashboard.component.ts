import { Component, OnInit } from '@angular/core';

import { Observable, Subject, of } from 'rxjs';

import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  games: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGamesFromApi()
    .subscribe(games => {
      games.results.map( (game:any) => {
        let newGame = {
          id: game.id,
          name: game.name,
          image: game.background_image,
          rating: game.rating,
          description: game.description_raw,
          released: game.released
        }
        this.games.push(newGame);
      })
    });
  }

  
}
