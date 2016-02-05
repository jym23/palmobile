var AppGallery = [];
( function(){
    AppGallery = {
        id: "#my-pictures-gallery",
        parent: "#my-pictures",
        path: function(){
            return cordova.file.externalRootDirectory + 'DCIM/Camera/'
        },
        init:function(){
            this.images();
            this.videos();
        },
        images: function () {
            $(AppGallery.id).find('.ui-grid-b').html('');
            var dcimCamera = cordova.file.externalRootDirectory + 'DCIM/Camera/';
            var block, ctr = 1, displayCtr = 0;
            window.resolveLocalFileSystemURL(dcimCamera,function(entry){
                //showMsg.innerHTML = JSON.stringify(entry);
                var dirEntry = entry.createReader();
                dirEntry.readEntries(
                    function(entries){
                        //showMsg.innerHTML = JSON.stringify(entries);
                        var ctr = 1, parent_ctr = 1, cls, parent_id = '';
                        for(i=0; i<entries.length; i++){
                            var fileEntry = entries[i];
                            if( fileEntry.isFile ){
                                //filters images
                                window.resolveLocalFileSystemURL(
                                    dcimCamera+fileEntry.name,
                                    function(fileEntry){
                                        fileEntry.file(function(f){
                                            //filter videos only
                                            if( f.type.indexOf("image") >= 0 ){
                                                parent_id = "parent-div-"+parent_ctr;
                                                cls = "ui-block-a";
                                                if(ctr == 2){
                                                    cls = "ui-block-b";
                                                }else if(ctr == 3){
                                                    cls = "ui-block-c"; ctr = 0;
                                                }
                                                var divAppend = '<div id="'+parent_id+'" class="'+cls+'">';
                                                    divAppend +=    '<div class="ui-tap-hold" style="text-align:center;">';
                                                    divAppend +=        '<span data-outer-parent="#my-pictures" data-parent-id="'+ parent_id +'" data-entry-name="'+fileEntry.name+'" class="img-chkbox" style="position:absolute;top:6px;right:6px;">';
                                                    divAppend +=            '<img src="images/btns/btn_box_border.png" class="checkbox off" width="20" height="20">';
                                                    divAppend +=        '</span>';
                                                    divAppend +=        '<img src="'+ dcimCamera + fileEntry.name +'" style="width:99%;height:99%;" class="thumb">';
                                                    divAppend +=    '</div>';
                                                    divAppend += '</div>';
                                                $(AppGallery.id).find('.ui-grid-b').append(divAppend);
                                                ctr++; parent_ctr++;
                                            }
                                        });
                                    },
                                    function(){}//error
                                );
                            }
                        }//end of for loop
                    },
                    function(error){
                        alert('error');
                    }
                );
            });
        },
        videos: function(){
            var parent_id = "#my-videos",
                dcimCamera = cordova.file.externalRootDirectory + 'DCIM/Camera/';

            $("#my-videos-gallery").find('.ui-grid-b').html('');

            window.resolveLocalFileSystemURL(dcimCamera,function(entry){
                //showMsg.innerHTML = JSON.stringify(entry);
                var dirEntry = entry.createReader();
                dirEntry.readEntries(
                    function(entries){
                        var cls,ctr=1,parent_ctr=1,parent_id;
                        $.each(entries, function(k,v){
                            //only for files
                            if(v.isFile){
                               var filePath = dcimCamera + v.name;
                                window.resolveLocalFileSystemURL(
                                    filePath,
                                    function(fileEntry){
                                        fileEntry.file(function(f){
                                            //filter videos only
                                            if( f.type.indexOf("video") >= 0 ){
                                                parent_id = "video-gal-" + parent_ctr;
                                                cls = "ui-block-a";
                                                if(ctr == 2){
                                                   cls = "ui-block-b";
                                                }else if(ctr == 3){
                                                   cls = "ui-block-c"; ctr = 0;//reset ctr to 0
                                                }
                                                navigator.createThumbnail(
                                                    filePath,
                                                    function(err, imageData){
                                                        if(err){ alert('Cannot create video thumbnail.'); }//show message if error occurs.

                                                        //create video thumbnails
                                                        var apnd = '<div class="'+cls+'" id="'+parent_id+'" style="position:relative;">';
                                                            apnd +=     '<span data-outer-parent="#my-videos" data-parent-id="'+ parent_id +'" data-entry-name="'+v.name+'" class="img-chkbox" style="position:absolute;top:6px;right:6px;">';
                                                            apnd +=        '<img src="images/btns/btn_box_border.png" class="checkbox off" width="20" height="20">';
                                                            apnd +=     '</span>';
                                                            apnd +=     '<span class="open-file" data-name="'+f.name+'"><img src="images/btns/btn_play.png" style="position:absolute;top:42%;left:38%;z-index:1;"></span>';
                                                            apnd +=     '<a href="javascript:void(0);" class="open-file" data-name="'+f.name+'"><img src="data:image/png;base64,'+imageData+'" class="thumb video-thumb"></a>';
                                                            apnd += '</div>';
                                                        $('#my-videos-gallery').find('.ui-grid-b').append(apnd);
                                                        //$(parent_id).find('#logs').append('<a href="javascript:void(0);" class="open-video" data-name="'+f.name+'"><img src="data:image/png;base64,' + imageData + '" style="width:100%;"></a>');
                                                    }
                                                );
                                                ctr++; parent_ctr++;
                                            }
                                        });
                                    },
                                    function(){}//error
                                );
                                //src: http://www.raymondcamden.com/2014/08/18/PhoneGapCordova-Example-Getting-File-Metadata-and-an-update-to-the-FAQ
                            }
                        });
                    },
                    function(error){
                        alert('error');
                    }
                );
            });
        },
        fileOpener: function(filename){
            var Opener = cordova.plugins.disusered.open;
            Opener(AppGallery.path() + filename);
        },
        /**
         * use to delete file/entry
         */
        delEntry: function(filename,parent_id){
            //alert(AppGallery.path());
            var fs = AppGallery.path() + filename;
            window.resolveLocalFileSystemURL(
                fs,
                function(entry){
                    entry.remove();
                    AppGallery.init();

                    //check controls after delete
                    AppGallery.showControls('#my-videos');
                    AppGallery.showControls('#my-pictures');

                    //check if emtpy images
                    AppGallery.showNoImage();

                    console.log('entry deleted.');
                },
                function(error){
                    console.log('cannot delete entry' + error);
                }
            );
        },
        /**
         * return true or false
         */
        checkIfGalleryEmpty: function(){
            var lgnth = $('#my-pictures-gallery').find('.thumb').length;
            return lgnth;
        },
        showControls: function(parentId){
            $(parentId).find("#gallery-controls, #tag-capture").hide();
            if( $(parentId).find(".ui-grid-b span.checked").length > 0 ){
                $(parentId).find("#gallery-controls").fadeIn(200);
            }else{
                $(parentId).find("#tag-capture").fadeIn(200);

                //we hide share buttons if visible
                $('#share-buttons').animate({bottom:"-50%",opacity:0},400,function(){
                    $('#share-buttons').css({"display":"none"});
                }).removeClass("open");
            }
        }
    };
} (jQuery) );