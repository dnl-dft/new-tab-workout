<template>
    <div class="tabfit-menu">

        <button id="button-undo" class="tabfit-menu-item" :class="[undoButtonStatus, undoButtonVisibility]" @click="showModal('undo')"><i class="icofont-ui-reply button-icon"></i></button>

        <button id="button-theme" class="tabfit-menu-item" :class="themeButtonStatus" @click="showModal('theme')">
            <i v-if="activatedTheme === 'light'" class="icofont-sun button-icon"></i>
            <i v-if="activatedTheme === 'dark'" class="icofont-moon button-icon"></i>
            <i v-if="activatedTheme === 'auto'" class="icofont-adjust button-icon"></i>
        </button>

        <button v-if="activatedSettingsActive" id="button-settings" class="tabfit-menu-item" :class="settingsButtonStatus" @click="toggleSettings()">
            <i class="icofont-ui-calendar button-icon"></i>
        </button>

        <div id="modal-theme" class="tabfit-menu-modal" :class="themeButtonStatus">
            <div class="tabfit-menu-modal-inner">
                <ul>
                    <li @click="changeTheme('light')" :class="themeListLightStatus"><i class="icofont-sun"></i> <span>Lightmode</span></li>
                    <li @click="changeTheme('dark')" :class="themeListDarkStatus"><i class="icofont-moon"></i> <span>Darkmode</span></li>
                    <li @click="changeTheme('auto')" :class="themeListAutoStatus"><i class="icofont-adjust"></i> <span>Automatic</span></li>
                </ul>
            </div>
        </div>

        <div id="modal-undo" class="tabfit-menu-modal" :class="undoButtonStatus">
            <div class="tabfit-menu-modal-inner">
                <div class="tabfit-menu-modal-inner-message">
                    Reset {{weekday}} and start again?
                </div>
                <button class="button-confirm" @click="resetDay">Yes</button>
                <button class="button-abort" @click="closeModal">No</button>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: 'AppMenu',
    data() { 
        return {
            activeModal: false,
        }
    },
    methods: {
        showModal(button) {
            if (this.activeModal !== button) {
                this.activeModal = button;
            } else {
                this.activeModal = false;
                console.log('attempted to clean')
            }
        },
        toggleSettings() {
            if (!this.showSettings) {
                this.$emit('sendShowSettings', true);
            } else {
                this.$emit('sendShowSettings', false);
            }
        },
        resetDay() {
            this.$emit('resetDay');
            this.closeModal();
            console.log('click succesfull')
        },
        changeTheme(mode) {
            this.$emit('themeChange', mode);
            console.log('themeChange emmitted')
        },
        closeModal() {
            this.activeModal = false;
        }

        
    },
    beforeMount() {
        
        window.addEventListener('mousedown', function(event){
            if (this.activeModal) {
                let modal = document.getElementById('modal-' + this.activeModal);
                let button = document.getElementById('button-' + this.activeModal);
                    if (event.target !== modal && !modal.contains(event.target) && event.target !== button && !button.contains(event.target)) {
                        this.activeModal = false;
                                        console.log('cleaned by event')

                    }
                }
        }.bind(this));

    },
    computed: {
        undoButtonVisibility() {
            if (this.doneToday > 0) {
                return 'visible';
            }
            return 'invisible';
        },
        undoButtonStatus() {
            if (this.activeModal === 'undo') {
                return 'active';
            }
            return 'inactive';
        },
        themeButtonStatus() {
            if (this.activeModal === 'theme') {
                return 'active';
            }
            return 'inactive';
        },
        settingsButtonStatus() {
            if (this.showSettings) {
                return 'active';
            }
            return 'inactive';
        },
        themeListAutoStatus() {
            if (this.activatedTheme === 'auto') {
                return 'active';
            }
            return 'inactive';
        },
        themeListDarkStatus() {
            if (this.activatedTheme === 'dark') {
                return 'active';
            }
            return 'inactive';
        },
        themeListLightStatus() {
            if (this.activatedTheme === 'light') {
                return 'active';
            }
            return 'inactive';
        },
    },
    props: {
        weekday: {type: String},
        activatedTheme: {type: String},
        doneToday: {type: Number},
        showSettings: {type: Boolean},
        activatedSettingsActive: {type: Boolean}

    },
    components: {
    }
}

</script>


<style>


button.tabfit-menu-item {width:40px; height:40px; border-radius: 40px; border:none; background: #444549; margin:24px 24px 0 0;  color:rgba(255,255,255,0.5); cursor: pointer;}
button.tabfit-menu-item.active {background: #4c4d50; color:rgba(255,255,255,0.75)}
button.tabfit-menu-item i {font-size:1.25em}

#button-undo.visible {visibility:visible}
#button-undo.invisible {visibility:hidden}


i.icofont-ui-reply.button-icon {transform: scaleX(-1); display:inline-block; font-size: 1.15em !important;}
i.icofont-adjust.button-icon {font-size: 1.5em !important;}

.tabfit-menu-modal {position: fixed; top:88px; z-index: 1200;}
.tabfit-menu-modal-inner {background: #4c4d50; position:relative; width:144px; border-radius: 9px; padding:8px 12px;}
.tabfit-menu-modal-inner:after {bottom: 100%; left: 50%; border: solid transparent; content: ""; height: 0; width: 0; position: absolute; pointer-events: none; border-color: rgba(136, 183, 213, 0); border-bottom-color: #4c4d50; border-width: 12px; margin-left: -12px;}

.tabfit-menu-modal#modal-theme {right:24px;}
.tabfit-menu-modal#modal-undo {right:88px;}

#modal-theme, #modal-undo {display: none;}
#modal-theme.active, #modal-undo.active {display: block;}

.tabfit-menu-modal-inner-message {font-size: 0.9em; color:rgba(255,255,255,1); font-weight: 400; padding:12px 8px 8px 8px; line-height: 1.4em;}

.tabfit-menu-modal button {border:none; border-radius:6px; margin:8px 8px 12px 8px; width:48px; height: 32px; color: rgba(255,255,255,1); font-size:0.75em; cursor: pointer;}
.tabfit-menu-modal button.button-confirm {background: #767BD5;}
.tabfit-menu-modal button.button-abort {background: #6a6b6d;}

#modal-theme ul {padding: 0; margin:0}
#modal-theme li {list-style: none; text-align: left; padding:6px 16px; margin:4px 0; border-radius:6px; color: rgba(255,255,255,0.75); font-weight:500}
#modal-theme li i {margin-right: 12px;}
#modal-theme li span {font-size:0.85em; white-space: nowrap;}
#modal-theme li:hover {background: #5b5c5f; color: rgba(255,255,255,1); cursor: pointer;}
#modal-theme li.active {background: #6a6b6d; color: rgba(255,255,255,1)}

.tabfit-menu-modal button {box-shadow: 0 10px 20px 0 rgba(21, 21, 23,0.1), inset 0 -10px 15px 0 rgba(62, 64, 68,0.15);}

#background.light button.tabfit-menu-item {background:#e6e6e6; color:#949496;}
#background.light button.tabfit-menu-item.active {background:#dbdbdc; color:rgba(32, 34, 39,0.5);}
#background.light .tabfit-menu-modal-inner {background:#dbdbdc;}
#background.light .tabfit-menu-modal-inner:after {border-bottom-color:#dbdbdc;}
#background.light .tabfit-menu-modal-inner-message {color:rgba(32, 34, 39,0.55);}
#background.light #modal-theme li {color:rgba(32, 34, 39,0.5);}
#background.light .tabfit-menu-modal button.button-abort  {background:#98999b;}
#background.light #modal-theme li.active, #background.light #modal-theme li.active:hover {background:#98999b; color:#fff}
#background.light #modal-theme li:hover {background:rgba(152, 153, 155,0.25);}



</style>
