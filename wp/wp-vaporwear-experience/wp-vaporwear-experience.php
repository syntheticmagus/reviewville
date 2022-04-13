<?php
/**
 * Plugin Name: WP Vaporwear Experience
 */

wp_enqueue_script('vaporwear-experience', plugins_url('assets/js/wp-vaporwear-experience.js', __FILE__));

function vaporwear_experience_shortcode_function($atts = array()) {
    extract(shortcode_atts(array('message' => 'default'), $atts));

    return '
    <div id="babylonDiv">
    </div>
    <script>
        console.log("Calling...");
        AddVaporwearExperienceToDiv("babylonDiv");
        console.log("Called!");
    </script>
    ';
}

add_shortcode('vaporwear-experience', 'vaporwear_experience_shortcode_function');
