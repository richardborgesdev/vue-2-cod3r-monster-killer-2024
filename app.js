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
    }
  },
  watch: {

  },
});
