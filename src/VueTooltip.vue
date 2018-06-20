<template>
  <span @mouseleave="hover('leave', $event)" @mouseenter="hover('enter', $event)">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'vue-tooltip',
  props: {
    placement: {
			type: String,
			default: 'bottom'
		},
		content: String,
		trigger: String,
		effect: {
			type: String,
			default: 'dark'
		}
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
			if(this.effect == 'light'){
				content.setAttribute('class', 'vue-tooltip-content vue-tooltip-content-light');
				arrow.setAttribute('class', 'vue-tooltip-arrow vue-tooltip-arrow-light');
			}
			content.innerHTML = this.content;
			popper.appendChild(content);

			return popper;
		},
		randomId() {
			let num = Math.random()*700 + 800;
      return parseInt(num, 10);
		},
		showTooltip(el) {
			this.show = !this.show;
			let rect = el.target.getBoundingClientRect()
			let myStyle = ''
			switch (this.placement) {
				case 'top':
					myStyle += `left:${rect.left}px; `
					myStyle += `top:${rect.top - this.el.clientHeight - 8}px; `
					break;
				case 'left':
					 myStyle += `left:${rect.x - rect.width - 12}px; `
					 myStyle += `top:${rect.y - rect.height}px; `
					break;
				case 'right':
					myStyle += `left:${rect.x + rect.width + 8}px; `
					myStyle += `top:${rect.y - rect.height}px; `
					break;
				case 'bottom':
					myStyle += `left:${rect.left}px; `
					myStyle += `top:${rect.y + rect.height}px; `
					break;
				default:
					myStyle += `left:${rect.left}px; `
					myStyle += `top:${rect.y + rect.height}px; `
					break;
			}
			myStyle += `visibility:${this.show? 'visible' : 'hidden'}`
			this.el.setAttribute('style', myStyle)
		},
		hover(event, el) {
			this.showTooltip(el);
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
.vue-tooltip-content.vue-tooltip-content-light{
	color: #303133;
	background-color: #fff;
	border: 1px solid #303133;
}
/* .vue-tooltip-arrow {
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
.vue-tooltip-arrow.vue-tooltip-arrow-light::before{
	position: absolute;
	top: -6px;;
	right: -6px;
	padding:0;
	border-bottom: 6px solid transparent;
	border-top: 6px solid #fff;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	display: block;
	content:'';
	z-index:11
}
.vue-tooltip-arrow.vue-tooltip-arrow-light::after{
	position: absolute;
	top: -6px;;
	right: -7px;
	padding:0;
	border-bottom: 7px solid transparent;
	border-top: 7px solid #000;
	border-left: 7px solid transparent;
	border-right: 7px solid transparent;
	display: block;
	content:'';
	z-index:10
} */
</style>

