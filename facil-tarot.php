<?php

/*
Plugin Name: Facil Tarot
Plugin URI: https://www.tarotinteractivo.com/tarot/
Description: Plugin de Tarot, para activarlo en cualquier página usar el shortcode: [facil_tarot]
Version: 1.0
Author: Luis A, Dervins Maswer & Anderson Hernández
Author URI: https://stackcreativo.com.ve
License: GPL2
*/


function card_path_img() {

    $path_img = plugins_url('/img/back-card.png', __FILE__ );
    return $path_img;
}

function wpb_hook_javascript() {
    ?>
        <script type="text/javascript">
          var path_img ="<?php echo plugins_url('/img/back-card.png', __FILE__ ); ?>"
        </script>
    <?php
}

function facil_tarot_scripts() {

    //JQUERY
    wp_deregister_script('jquery');
    wp_register_script('jquery-script', plugins_url('assets/js/vendor/jquery-3.3.1.min.js',__FILE__), false, '3.3.1');
    wp_enqueue_script('jquery-script');
    //SCRIPTS
    wp_register_script('bootstrap-js', plugins_url( '/assets/js/bootstrap.js', __FILE__ ), array('jquery'), '4.3', false);
    wp_register_script('picture-fill', plugins_url( '/assets/js/picturefill.min.js', __FILE__ ));
    wp_register_script('master-script',plugins_url( '/assets/js/master.js', __FILE__ ), false, 1.0, true);
    wp_enqueue_script('bootstrap-js');
    wp_enqueue_script('picture-fill');
    wp_enqueue_script('master-script');
    //STYLES
    wp_register_style('bootstrap-style', plugins_url( '/assets/css/bootstrap.css', __FILE__ ));
    wp_enqueue_style('bootstrap-style');
    wp_register_style('animation-style', plugins_url( '/assets/css/animation.css', __FILE__ ));
    wp_enqueue_style('animation-style');
    wp_register_style('tarot-style', plugins_url( '/assets/css/tarot-style.css', __FILE__ ));
    wp_enqueue_style('tarot-style');
}


function facil_tarot_function() {
    $tarot_index = include( plugin_dir_path(__FILE__).'/public_html/index.php');
    return $tarot_index;
}


function resultado_amor() {
    $dir = load_template( dirname( __FILE__ ) . '/templates/resultado_amor.php' );
    return $dir;
}


//Actions
add_action('wp_head', 'wpb_hook_javascript');
add_action( 'wp_enqueue_scripts', 'facil_tarot_scripts');
//Shortcodes
add_shortcode('facil_tarot', 'facil_tarot_function');



