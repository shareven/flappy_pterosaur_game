import 'package:flame/collisions.dart';
import 'package:flame/components.dart';
import 'package:flappy_pterosaur_game/game/assets.dart';
import 'package:flappy_pterosaur_game/game/configuration.dart';
import 'package:flappy_pterosaur_game/game/flappy_pterosaur_game.dart';
import 'package:flappy_pterosaur_game/game/pipe_position.dart';

class Pipe extends SpriteComponent with HasGameRef<FlappyPterosaurGame> {
  Pipe({
    required this.pipePosition,
    required this.height,
  });

  @override
  final double height;
  final PipePosition pipePosition;

  @override
  Future<void> onLoad() async {
    final pipe = game.images.fromCache(Assets.pipe);
    final pipeRotated = game.images.fromCache(Assets.pipeRotated);
    size = Vector2(50, height);

    switch (pipePosition) {
      case PipePosition.top:
        position.y = 0;
        sprite = Sprite(pipeRotated);
        break;
      case PipePosition.bottom:
        position.y = gameRef.size.y - size.y - Config.groundHeight;
        sprite = Sprite(pipe);
        break;
    }

    add(RectangleHitbox());
  }
}
