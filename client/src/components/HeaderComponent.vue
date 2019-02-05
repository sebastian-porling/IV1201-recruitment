<template>
	<div class ="header">
		<img alt="Vue logo" src="../assets/logo.png">
		<h1>this is our header</h1>
		<ul class ="navbar_nav">
		<li class="nav__item"><router-link to="/" class="nav__link">Home</router-link></li>
		<li class="nav__item"><router-link to="/Login" class="nav__link">Login</router-link></li>
		</ul>
		<router-link to="/" class="nav__link">Home</router-link>

	</div>
</template>

<script>
	export default {
		name: 'HeaderComponent',
		data() {
			return{
				loginURL: 'test.se'
			}
		}
	}
</script>

<style>
	.nav {
    overflow: hidden;
    background-color: black;   
}
.nav a {
    float: left;
    color: white;
    text-align: center;
    padding: 1em 1em;
    text-decoration: none;
    font-size: 1em;
}
.nav a:hover {
    background-color: white;
    color: black;
}
.nav {
    display: flex;
    align-items: center;
    width: 85%;
    padding: 1em 0;
    margin: 0 auto;

    @include respond(tablet-landscape) {
        width: 90%;
    }

    &__link {
        color: rgba(255, 255, 255, 0.7);
        transition: opacity 0.5s ease;

        &--rounded {
            border-radius: 20px;
            border: 2px solid #fff;
            padding: 5px 17px 7px;

            &:hover {
                opacity: 0.5;
            }
        }

        &--btn {
            background: transparent;
            font-family: 'Work Sans', sans-serif;
            color: #fff;
            cursor: pointer;
        }
    }

    &__item {
        list-style: none;
        font-size: 0.8em;
        display: flex;
        align-items: center;
    }
}

.navbar {
    &__brand {
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 1.2em;
        display: flex;
        align-items: center;
    }

    &__textbrand {
        font-family: 'Russo One', sans-serif;
        animation: fadeIn 0.5s ease;
    }

    &__icon {
        font-size: 2.5em;
        color: #fff;

        &--logo {
            transform: rotate(45deg);
            font-size: 1.8em;
            color: #fff;
            animation: zoomIn 0.5s linear;
        }
    }

    &__nav {
        display: flex;
        margin: 0 1em;
        align-items: center;

        @include respond(phone) {
            display: none;
        }

        &--right {
            flex-grow: 1;
            text-align: right;
            justify-content: flex-end;
        }
    }

    &__toggle {
        position: relative;
        z-index: 10;
        display: none;
        flex-grow: 1;
        text-align: right;
        justify-content: flex-end;
        cursor: pointer;

        @include respond(phone) {
            display: initial;
        }

        &--icon {
            font-size: 2em;
        }
    }
}
</style>
