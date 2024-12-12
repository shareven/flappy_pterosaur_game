import 'package:flame/components.dart';
import 'package:flame/parallax.dart';
import 'package:flappy_pterosaur_game/game/assets.dart';
import 'package:flappy_pterosaur_game/game/configuration.dart';
import 'package:flappy_pterosaur_game/game/flappy_pterosaur_game.dart';

class Clouds extends ParallaxComponent<FlappyPterosaurGame>
    with HasGameRef<FlappyPterosaurGame> {
  Clouds();

  @override
  Future<void> onLoad() async {
    final image = game.images.fromCache(Assets.clouds);
    position = Vector2(x, -(gameRef.size.y - Config.cloudsHeight));
    parallax = Parallax([
      ParallaxLayer(
        ParallaxImage(image, fill: LayerFill.none),
      ),
    ]);
  }

  @override
  void update(double dt) {
    super.update(dt);
    parallax?.baseVelocity.x = Config.gameSpeed;
  }
}
