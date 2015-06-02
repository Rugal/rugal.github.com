// Copyright 2015 XYKbear
//Thanks for the idea from XYKbear
//https://github.com/xykbear/xykbear.github.io

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function($, window, document) {
    'use strict';

    var $window = $(window),
        $document = $(document);
    var $cover = $(".cover"),
        $header = $(".header"),
        headerHeight = 68; //由于导航栏高度可变故设定为所需的固定值

    $document.on('ready', function() {

        //切换导航栏样式
        $window.on('scroll', function() {
            if ($window.scrollTop() > ($cover.outerHeight() - headerHeight)) {
                $header.removeClass('header_invert');
            } else {
                $header.addClass('header_invert');
            }
        });
        $window.scrollTop(0); //页面打开时触发一次滚动时间

        //监控<a>标签的链接
        $(".header a").click(function(e) {
            var href = $(this).attr("href");
            if (href.indexOf("#") === 0) {
                //获取目标坐标，+1用于保证导航栏样式的切换
                var calcOffset = $(href).offset().top - headerHeight + 1;
                $('html,body').animate({
                    scrollTop: calcOffset
                }, 400);
                e.preventDefault();
            };
        });

    });
})(jQuery, window, document);
