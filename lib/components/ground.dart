import 'package:flame/collisions.dart';
import 'package:flame/components.dart';
import 'package:flame/parallax.dart';
import 'package:flappy_pterosaur_game/game/assets.dart';
import 'package:flappy_pterosaur_game/game/configuration.dart';
import 'package:flappy_pterosaur_game/game/flappy_pterosaur_game.dart';

class Ground extends ParallaxComponent<FlappyPterosaurGame>
    with HasGameRef<FlappyPterosaurGame> {
  Ground();

  @override
  Future<void> onLoad() async {
    final ground = game.images.fromCache(Assets.ground);
    parallax = Parallax([
      ParallaxLayer(
        ParallaxImage(ground, fill: LayerFill.none),
      ),
    ]);
    add(
      RectangleHitbox(
        position: Vector2(0, gameRef.size.y - Config.groundHeight),
        size: Vector2(gameRef.size.x, Config.groundHeight),
      ),
    );
  }

  @override
  void update(double dt) {
    super.update(dt);
    parallax?.baseVelocity.x = Config.gameSpeed;
  }
}
