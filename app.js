new Vue({
  el: '#app',
  data: {
    playerLife: 100,
    monsterLife: 100,
    running: false,
    logs: [],
  },
  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0;
    }
  },
  methods: {
    startGame() {
      this.running = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
    },
    attack(especial = false) {
      this.hurt(
        'playerLife', 
        5, 
        10, 
        especial,
        'Jogador',
        'Mostro',
        'player'
      );

      if (this.monsterLife > 0) {
        this.hurt(
          'monsterLife', 
          7, 
          12, 
          false,
          'Monstro',
          'Jogador',
          'monster'
        );
      }
    },
    hurt(prop, min, max, especial, source, target, classParam) {
      const plus = especial
        ? 5
        : 0;
      const hurt = this.getRandom(min + plus, max + plus);
      this[prop] = Math.max(this.playerLife - hurt, 0);

      this.registerLog(
        `${source} atingiu ${target} com ${hurt}`,
        classParam,
      );
    },
    healAndHurt() {
      this.heal(10, 15);
      this.hurt(
        'playerLife', 
        7, 
        12, 
        false,
        'Monstro',
        'Jogador',
        'monster',
      );
    },
    heal(min, max) {
      const heal = this.getRandom(min, max);
      this.playerLife = Math.min(this.playerLife + heal, 100);
      this.registerLog(`Jogador ganhou força de ${heal}`, 'player');
    },
    getRandom(min = 0, max = 10) {
      const value = Math.random() * (max - min) + min;

      return Math.round(value);
    },
    registerLog(text, classParam) {
      this.logs.unshift({
        text,
        classParam,
      });
    },
  },
  watch: {
    hasResult(value) {
      if (value) {
        this.running = false;
      }
    },
  },
});
