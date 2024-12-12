import 'dart:math';

import 'package:flame/collisions.dart';
import 'package:flame/components.dart';
import 'package:flame/effects.dart';
import 'package:flame_audio/flame_audio.dart';
import 'package:flappy_pterosaur_game/game/assets.dart';
import 'package:flappy_pterosaur_game/game/configuration.dart';
import 'package:flappy_pterosaur_game/game/flappy_pterosaur_game.dart';
import 'package:flappy_pterosaur_game/game/pterosaur_movement.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Pterosaur extends SpriteGroupComponent<PterosaurMovement>
    with HasGameRef<FlappyPterosaurGame>, CollisionCallbacks {
  Pterosaur();

  int score = 0;
  int historyBestScore = 0;

  @override
  Future<void> onLoad() async {
    getHistoryBestScore();
    
    final pterosaurMidFlap =
        Sprite(game.images.fromCache(Assets.pterosaurMidFlap));
    final pterosaurUpFlap =
        Sprite(game.images.fromCache(Assets.pterosaurUpFlap));
    final pterosaurDownFlap =
        Sprite(game.images.fromCache(Assets.pterosaurDownFlap));

    gameRef.pterosaur;

    size = Vector2(80, 70);
    position = Vector2(80, gameRef.size.y / 2 - size.y / 2);
    sprites = {
      PterosaurMovement.middle: pterosaurMidFlap,
      PterosaurMovement.up: pterosaurUpFlap,
      PterosaurMovement.down: pterosaurDownFlap,
    };
    current = PterosaurMovement.middle;

    add(CircleHitbox());
  }

  @override
  void update(double dt) {
    super.update(dt);
    position.y += Config.pterosaurVelocity * dt;
    if (position.y < 1) {
      gameOver();
    }
  }

  Future getHistoryBestScore() async {
    var storage = await SharedPreferences.getInstance();
    historyBestScore = storage.getInt("HistoryBestScore") ?? 0;
  }

  Future setHistoryBestScore() async {
    var storage = await SharedPreferences.getInstance();
    int bestScore = storage.getInt("HistoryBestScore") ?? 0;
    historyBestScore = max(bestScore, score);
    await storage.setInt("HistoryBestScore", historyBestScore);
  }

  void fly() {
    add(
      MoveByEffect(
        Vector2(0, Config.gravity),
        EffectController(duration: 0.2, curve: Curves.decelerate),
        onComplete: () => current = PterosaurMovement.down,
      ),
    );
    FlameAudio.play(Assets.flying);
    current = PterosaurMovement.up;
  }

  @override
  void onCollisionStart(
    Set<Vector2> intersectionPoints,
    PositionComponent other,
  ) {
    super.onCollisionStart(intersectionPoints, other);

    gameOver();
  }

  void reset() {
    position = Vector2(50, gameRef.size.y / 2 - size.y / 2);
    score = 0;
  }

  void gameOver() {
    FlameAudio.play(Assets.collision);
    game.isHit = true;
    gameRef.overlays.add('gameOver');
    gameRef.pauseEngine();
  }
}
