/**
 * Created with IntelliJ IDEA.
 * User: nancy
 * Date: 12/22/13
 * Time: 11:14 AM
 * To change this template use File | Settings | File Templates.
 */

$(function(){
    $('.jnzoom').jqzoom({
        zoomType: 'standard',
        lens:true,
        preloadImages: false,
        alwaysOn:false,
        zoomWidth: 340,
        zoomHeight: 340,
        xOffset:10,
        yOffset:0,
        position:'right'
    });
});