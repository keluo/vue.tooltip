<template>
  <span @mouseleave="hover('leave', $event)" @mouseenter="hover('enter', $event)">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'vue-tooltip',
  props: {
    placement: String,
		content: String,
	  trigger: String
  },
  data () {
    return {
      show:false,
			el:''
    }
  },
  mounted () {
    this.init()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    init() {
			this.el = this.createTooltipElement();
			document.body.appendChild(this.el);
    },
    createTooltipElement(options) {
			// wrapper
			var popper = document.createElement('div');
			popper.setAttribute('id', 'tooltip-' + this.randomId());
			popper.setAttribute('class', 'vue-tooltip');
			popper.style.visibility = 'hidden';

			// make arrow
			var arrow = document.createElement('div');
			arrow.setAttribute('class', 'vue-tooltip-arrow');
			popper.appendChild(arrow);

			// make content container
			var content = document.createElement('div');
			content.setAttribute('class', 'vue-tooltip-content');
			content.innerHTML = this.content;
			popper.appendChild(content);

			return popper;
		},
		randomId() {
			let num = Math.random()*700 + 800;
      num = parseInt(num, 10);
      return num
		},
		showTooltip(el) {
			this.show = !this.show;
			var rect = el.target.getBoundingClientRect();
			this.el.setAttribute('style','visibility:'+(this.show?'visible': 'hidden')+';left:' + (rect.left) + 'px;top:' + (rect.top   -  this.el.clientHeight  - 8) + 'px;'); 
		},
		hover(event, el) {
			if(event === 'leave'){
				this.showTooltip(el);
			}else if(event === 'enter'){
				this.showTooltip(el);
			}
		}
  }
}
</script>

<style>
 .vue-tooltip {
	position: absolute;
	z-index: 1060;
	visibility: hidden;
	font-size: 12px;
	line-height: 1.5;
}
.vue-tooltip-content{
	max-width: 250px;
	padding: 8px 10px;
	color: #fff;
	text-align: left;
	text-decoration: none;
	background-color: rgba(64,64,64,.85);
	border-radius: 4px;
	box-shadow: 0 1px 6px rgba(0,0,0,.2);
	min-height: 34px;
}
.vue-tooltip-arrow {
	position: absolute;
	width: 0;
	height: 0;
	border-color: transparent;
	border-style: solid;
}
.vue-tooltip-arrow {
	left: 7px;
	border-width: 5px 5px 0;
	border-top-color: rgba(64,64,64,.85);
	bottom: -5px;
}
</style>

