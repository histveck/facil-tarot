<?php
/*
Plugin Name: Facil Tarot
Plugin URI: https://www.tarotinteractivo.com/tarot/
Description: Plugin de Tarot, para activarlo en cualquier página usar el shortcode: [facil_tarot num_card=NUM id_page=ID]
Version: 1.0
Author: Luis A, Dervins Maswer & Anderson Hernández
Author URI: https://stackcreativo.com.ve
License: GPL2
*/


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



function facil_tarot_shortcode($atts = [], $content = null, $tag = '')
{
    // normalize attribute keys, lowercase
    $atts = array_change_key_case((array)$atts, CASE_LOWER);
    // override default attributes with user attributes
    $facil_tarot_atts = shortcode_atts([
                                     'num_card' =>10,
                                     'id_page' =>0,
                                     'url_page'=>'',
                                 ], $atts, $tag);
    $page_link = get_page_link($facil_tarot_atts['id_page']);
    // return output
    $tarot_index = include( plugin_dir_path(__FILE__).'/public_html/index.php');
}



function facil_tarot_shortcodes_init()
{
    add_shortcode('facil_tarot', 'facil_tarot_shortcode');
}
 


//Actions
add_action('init', 'facil_tarot_shortcodes_init');
add_action('wp_head', 'wpb_hook_javascript');
add_action( 'wp_enqueue_scripts', 'facil_tarot_scripts');
