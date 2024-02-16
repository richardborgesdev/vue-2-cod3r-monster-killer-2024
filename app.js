new Vue({
  el: '#app',
  data: {
    playerLife: 0,
    monsterLife: 10,
    running: false,
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
    },
    attack(especial = false) {
      this.hurt('playerLife', 5, 10, especial);
      this.hurt('monsterLife', 7, 12, false);
    },
    hurt(prop, min, max, especial) {
      const plus = especial
        ? 5
        : 0;
      const hurt = this.getRandom(min + plus, max + plus);
      this[prop] = Math.max(this.playerLife - hurt, 0);

    },
    healAndHurt() {
      this.heal(10, 15);
      this.hurt('playerLife', 7, 12, false);
    },
    heal(min, max) {
      const heal = this.getRandom(min, max);
      this.playerLife = Math.min(this.playerLife + heal, 100);
    },
    getRandom(min = 0, max = 10) {
      const value = Math.random() * (max - min) + min;

      return Math.round(value);
    }
  },
  watch: {
    hasResult(value) {
      if (value) {
        this.running = false;
      }
    },
  },
});
