import 'dart:async';
import 'package:flame/components.dart';
import 'package:flappy_pterosaur_game/game/assets.dart';
import 'package:flappy_pterosaur_game/game/flappy_pterosaur_game.dart';

class Background extends SpriteComponent with HasGameRef<FlappyPterosaurGame> {
  Background();

  @override
  Future<void> onLoad() async {
    final background = game.images.fromCache(Assets.backgorund);
    size = gameRef.size;
    sprite = Sprite(background);
  }
}
