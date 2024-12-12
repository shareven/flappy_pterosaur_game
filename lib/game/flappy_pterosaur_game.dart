import 'package:flame/components.dart';
import 'package:flame/events.dart';
import 'package:flame/game.dart';
import 'package:flappy_pterosaur_game/components/background.dart';
import 'package:flappy_pterosaur_game/components/pterosaur.dart';
import 'package:flappy_pterosaur_game/components/ground.dart';
import 'package:flappy_pterosaur_game/components/pipe_group.dart';
import 'package:flappy_pterosaur_game/game/assets.dart';
import 'package:flappy_pterosaur_game/game/configuration.dart';
import 'package:flutter/painting.dart';

class FlappyPterosaurGame extends FlameGame
    with TapDetector, HasCollisionDetection {
  FlappyPterosaurGame();

  late Pterosaur pterosaur;
  Timer interval = Timer(Config.pipeInterval, repeat: true);
  bool isHit = false;
  late TextComponent score;
  @override
  Future<void> onLoad() async {
    await images.loadAll([
      Assets.backgorund,
      Assets.ground,
      Assets.clouds,
      Assets.pipe,
      Assets.pipeRotated,
      Assets.pterosaurMidFlap,
      Assets.pterosaurUpFlap,
      Assets.pterosaurDownFlap,
      // Assets.gameOver,
      // Assets.menu,
      // Assets.message,
    ]);

    addAll([
      Background(),
      Ground(),
      pterosaur = Pterosaur(),
      score = buildScore(),
    ]);

    interval.onTick = () => add(PipeGroup());
  }

  TextComponent buildScore() {
    return TextComponent(
        position: Vector2(size.x / 2, size.y / 2 * 0.2),
        anchor: Anchor.center,
        textRenderer: TextPaint(
          style: const TextStyle(
              fontSize: 40, fontFamily: 'Game', fontWeight: FontWeight.bold),
        ));
  }

  @override
  void onTap() {
    pterosaur.fly();
  }

  @override
  void update(double dt) {
    super.update(dt);
    interval.update(dt);
    score.text = 'Score: ${pterosaur.score}';
  }
}
