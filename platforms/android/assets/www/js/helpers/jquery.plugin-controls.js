var appBrightness = ( function() {
    var brghtnss = {
        set: function(value){ brightness.setBrightness(value, brghtnss.win, brghtnss.fail); },
        get: function(){ brightness.getBrightness( brghtnss.win, brghtnss.fail); },
        win: function(status){console.log('Message brightness status: ' + status);},
        fail: function(status){console.log('Error brightness: ' + status);}
    }
    return brghtnss;
} ());

var appSetting = ( function() {
    var init = {
        open: function(v,e){
            $( e.target ).addClass('scale-on');
            cordova.plugins.settings.openSetting(v, function(){console.log("success")},function(){console.log("failed")});
            setTimeout( function(){
                $( e.target ).removeClass('scale-on');
            },100);
        },
        startApp: function(pckge, e){
            $( e.target ).addClass('scale-on');
            navigator.startApp.start(pckge, function(message) {  /* success */
                    console.log(message); // => OK
                },
                function(error) { /* error */
                    console.log(error);alert(error);
                }
            );
            setTimeout( function(){
                $( e.target ).removeClass('scale-on');
            },100);
        }
    }
    return init;
} ());

//src docs: https://www.npmjs.com/package/cordova-plugin-x-socialsharing
var AppSocialShare = ( function(){
    var init = {
        basePath: function(){
            return cordova.file.externalRootDirectory + 'DCIM/Camera/';
        },
        def: function(){
            window.plugins.socialsharing.share('Message here');
        },
        email: function(files){
            window.plugins.socialsharing.shareViaEmail(
                'Your Message',
                'Subject',
                'bandong03@gmail.com',//to
                '',//cc
                '',//bcc
                files,//files
                function(success){alert('success share');},
                function(error){alert('error share');}
            );
        },
        fb: function(files){
            window.plugins.socialsharing.shareViaFacebook(
                'Message',
                files,//image
                null,//url
                function(){ console.log('fb share ok.'); },
                function(){ console.log('fb share error.'); }
            );
        },
        twt: function(files){
            window.plugins.socialsharing.shareViaTwitter(
                'Message',
                files,//img
                null //link
            );
        }
    }
    return init;
}());

/* src: http://docs.phonegap.com/en/edge/cordova_camera_camera.md.html */
var AppCamera = ( function () {
    var init = {
        takePhoto: function(){
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URL,
                sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                encodingType: 0,     // 0=JPG 1=PNG
                //allowEdit: true,
                saveToPhotoAlbum: true
            };
            //navigator.camera.MediaType(2);
            navigator.camera.getPicture(
                function(imgData) {
                    AppGallery.init();
                },//success
                function() {},//error || camera fails
                options
            );
        },
        deviceCapture: function(){
            navigator.device.capture.captureImage(function(mediaFiles){AppGallery.init();}, function(error){}, {limit:1});
        },
        deviceCaptureVideo: function(){
            navigator.device.capture.captureVideo(function(mediaFiles){AppGallery.videos();}, function(error){}, {limit:1});
        },
        deviceCaptureImage: function(){
            navigator.device.capture.captureImage(function(mediaFiles){AppGallery.images();}, function(error){}, {limit:1});
        }
    }
    return init;
} () );
( function( $ ) {
    $( document ).on('click','a.btn-camera, #capture-new-image, #btn-camera-capture', function( event ){
        event.preventDefault();
        AppCamera.deviceCaptureImage();
    });
    $(document).on('click','#btn-video-capture',function(){
        AppCamera.deviceCaptureVideo();
    });
    $( document ).on('change','.brightness-wrapper', function( event ){
        event.preventDefault();
        var value = parseFloat($('#brightness').val()) / 100;
        appBrightness.set( value );
    });
    //panel buttons has access to settings
    $( document ).on('click','.panel-btn-clk',function(event){
        var sttngs = $( this ).data('setting'), isApp = $( this ).data('isapp');
        if( isApp == true )
            appSetting.startApp(sttngs, event);
        else
            appSetting.open(sttngs, event);
    });

    $(document).on('click','span.img-chkbox',function(event){
        event.preventDefault();
        var off = $(this).find('img.off'),
            on = $(this).find('img.on'),
            outerParent = $(this).data('outer-parent');

        if(off.length > 0){
            $(this).addClass("checked");
            off.attr('src','images/btns/btn_checkbox.png').removeClass("off").addClass("on");
        }else{
            $(this).removeClass("checked");
            on.attr('src','images/btns/btn_box_border.png').removeClass("on").addClass("off");
        }
        //set controls
        AppGallery.showControls(outerParent);

    });
    $(document).on('click','#delete-imgs',function(event){
        event.preventDefault();
        var getCheckedImages = $('#my-pictures-gallery .ui-grid-b').find('span.checked');
        if(getCheckedImages.length > 0){
            var fileEntry = $(getCheckedImages).data('entry');
            $.each(getCheckedImages, function(k,val){
                var fileEntryName = $(val).data('entry-name');
                var parent_id = $(val).data('parent-id');
                AppGallery.delEntry(fileEntryName,parent_id);
            });
        }else{
            alert('Please select image(s) to delete.');
        }
    });
    $(document).on('click','#delete-vids',function(event){
            event.preventDefault();
            var getCheckedImages = $('#my-videos-gallery .ui-grid-b').find('span.checked');
            if(getCheckedImages.length > 0){
                var fileEntry = $(getCheckedImages).data('entry');
                $.each(getCheckedImages, function(k,val){
                    var fileEntryName = $(val).data('entry-name');
                    var parent_id = $(val).data('parent-id');
                    AppGallery.delEntry(fileEntryName,parent_id);
                });
            }else{
                alert('Please select image(s) to delete.');
            }
        });
    $(document).on('click','.open-file', function(event){
        var fn = $(this).data('name');
        AppGallery.fileOpener(fn);
    });

    //launch google play
    $(document).on('click','#app-store',function(event){
        event.preventDefault();
        cordova.plugins.market.open('com.android.vending');
    });

    $(document).on('click','#scan-now',function(event){
        event.preventDefault();
        cordova.plugins.barcodeScanner.scan(
            function(results){
                alert(JSON.stringify(results));
            },
            function(error){
                alert("Scanning failed.");
            }
        );
    });

    $(document).on('click','#toogle-share-box',function(event){
        event.preventDefault();
        if( $('#share-buttons').hasClass("open") ){
            $('#share-buttons').animate({bottom:"-50%",opacity:0},400,function(){
                $('#share-buttons').css({"display":"none"});
            }).removeClass("open");
            return;
        }
        $('#share-buttons').css({"display":"block"}).animate({bottom:0,opacity:1},400).addClass("open");
    });
    $(document).on('click','.btn-socialshare',function(event){
        event.preventDefault();
        var activeGalleryPage = '#'+$.mobile.activePage.attr('id'), id = $(this).data('id'), files = [];

        var getCheckedImages = $(activeGalleryPage + ' .ui-grid-b').find('span.checked');
        if(getCheckedImages.length > 0){
            var fileEntry = $(getCheckedImages).data('entry');
            $.each(getCheckedImages, function(k,val){
                files.push(AppSocialShare.basePath() + $(val).data('entry-name'));
            });
        }else{
            alert('Please select image(s) to share.');
            return;
        }
        switch(id){
            case 'gmail':
            case 'mail':
                AppSocialShare.email(files);
                break;
            case 'fb':
                AppSocialShare.fb(files);
                break;
            default:
                AppSocialShare.def();
        }
    });

    //we removed sharebox if visible
    document.addEventListener("backbutton", function(){
        if( $('#share-buttons').hasClass("open") ){
            $('#share-buttons').animate({bottom:"-50%",opacity:0},400,function(){
                $('#share-buttons').css({"display":"none"});
            }).removeClass("open");
        }
        history.back();
        return false;
    }, false);

    //enable plugin datepicker
    $(document).on('focus','#room-cleaning-date, #tray-pickup-date, #tr-date',function(event){
        event.preventDefault();
        var trgt = $(this);
        datePicker.show(
            {
                date:new Date(),
                mode: 'date'
            },//options
            function(date){
                var m = parseInt(date.getMonth()) + 1;
                if(m < 10) m = '0'+m;
                var val = date.getDate() +'-'+m+'-'+date.getFullYear();
                trgt.val(val);
                //alert(date.getDate() + ' and ' + date.getMonth() + ' and ' + date.getFullYear());
            },//success
            function(error){
                alert('Error' + error);
            }//error
        );
    });

} (jQuery));