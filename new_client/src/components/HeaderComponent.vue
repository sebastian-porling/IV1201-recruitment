<template>
    <mdb-navbar expand="large" dark class="indigo">
    <!-- Navbar brand -->
    <mdb-navbar-brand>
        Navbar
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
        <mdb-navbar-nav>
            <mdb-nav-item to="/" active>Home</mdb-nav-item>
            <mdb-nav-item to="/login">Login</mdb-nav-item>
            <mdb-nav-item to="/register">Register</mdb-nav-item>
        </mdb-navbar-nav>
    </mdb-navbar-toggler>
    </mdb-navbar>
</template>

<script>
    import { mdbNavbar, mdbNavItem, mdbNavbarNav, mdbNavbarToggler, mdbNavbarBrand, mdbFooter } from 'mdbvue';
	export default {
		name: 'HeaderComponent',
		data() {
			return{
				loginURL: 'test.se'
			}
        },
        components: {
            mdbNavbar,
            mdbNavItem,
            mdbNavbarNav,
            mdbNavbarToggler,
            mdbNavbarBrand,
            mdbFooter
        }
	}
</script>

<style>
</style>
