import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../game';
import { GameService } from '../game.service';
@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.css']
})
export class GamesDetailComponent implements OnInit  {
  game: Game | undefined;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getGame();
    console.log(this.game);
  }
  
  getGame(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gameService.getGame(id)
      .subscribe(game => {
        let searchedGame = {
          id: game.id,
          name: game.name,
          image: game.background_image,
          rating: game.rating,
          description: game.description_raw,
          released: game.released
        }
        this.game = searchedGame;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
