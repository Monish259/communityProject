var id  = location.pathname.split('/')[3];
$(document).ready(function(){
  AllAdmins();
});
$('.joinBtn').click(function(){
    var data = $(this).data('id');
    var _id = id;
    var mydata={};
    mydata._id=_id;
    mydata.join=data;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(mydata),
      contentType: 'application/json',
      url: '/community/communityprofile/'+_id,
      success: function (response) {
        if(data==1 || data==2){
          location.reload();
        } else {
          $('.requestBtn').text('Requested');
          $('.joinBtn').addClass('disabled');
        }
      },
      error: function (response) {
        alert(response.error);
      }
    });
});
/* -----------------------------------Leave Community----------------------------------------------- */
function sendReasonToOwner(community,msg){
    $.ajax({
      type: 'POST',
      data: JSON.stringify({community:community,msg:msg}),
      contentType: 'application/json',
      url: '/community/sendCommunityLeaveReason',
      success: function (response) {
        $.alert({
          title:'&nbsp;',
          content:"<h4><center><b>Thank you</b></center></h4>",
          buttons: {
             'ok': {
                 btnClass: 'btn-default',
                 action: function(){
                     location.reload();
                  }
                },
           }
        });
      },
      error: function (response) {
        notie.alert({type: 3, text:'Something went wrong!', time: 2});
      }
    });
}
function leaveCommunityAction(community){    /* this will responsible for leave community */
     $.ajax({
       type: 'POST',
       data: JSON.stringify({community:community}),
       contentType: 'application/json',
       url: '/community/leaveCommunity',
       success: function (response) {
         location.reload();
       },
       error: function (response) {
         notie.alert({type: 3, text:'Something went wrong!', time: 2});
       }
     });
}
function askForReasonToLeave(community){
    $.confirm({
      title: 'Sorry to see you go?',
      content: '' +
      '<div class="form-group">' +
      '<label>Why you want to leave this community?</label>' +
      '<input type="text" placeholder="Tell us something..." class="community-leave-reason form-control" required />' +
      '</div>',
      buttons: {
          formSubmit: {
              text: 'Submit',
              btnClass: 'btn-primary',
              action: function () {
                  var reason_message = this.$content.find('.community-leave-reason').val().trim();
                  if(!reason_message || !reason_message.length){
                      $.alert({title:'&nbsp;',content:'<center><b>Enter message first</b></center>'});
                      return false;
                  }
                  sendReasonToOwner(community,reason_message);
              }
          },
          skip: function () {
            location.reload();
          },
      },
  });
}
function leaveCommunity(community){
    $.confirm({
     title: 'Leave Community!',
     content: 'Do you really want leave this community?',
     buttons: {
        'Yes': {
            btnClass: 'btn-success',
            action: function(){
                leaveCommunityAction(community);
                // TODO: second version
                //askForReasonToLeave(community);
             }
           },
           'No': {btnClass: 'btn-danger',}
      }
   });
}
function initUserListForProfilePageForJoinedUsers(totalGetedUsers){
    $.ajax({
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({_id:id,limit:4-totalGetedUsers,skip:0}),
         url: '/community/allcomusers/'+id,
         success: function (response) {
           var pcode = '';
           for(i=0;i<response.length-1;i++)
           {
             try{
               pcode = '<div class="col-sm-6 col-xs-3 col-md-3 col-lg-3 center-all" style="padding:0;">';
               pcode += '  <a href="/viewprofile/'+response[i].AllUsers[0]._id+'" class="communityProfileUserImage">';
               pcode += '    <img class="communityProfileUserImage allSidesSoft" src="/Upload/Profile/'+response[i].AllUsers[0].profilePic+'" />';
               pcode += '  </a>';
               pcode += '</div>';
               $('#membersDiv-4joinedUser').append(pcode);
             }
             catch(err){
               pcode ='';
             }
           }
         },
         error: function (err) {
             notie.alert({type: 3, text:'Something went wrong!', time: 2})
         }
     });
}
/* ------------------------------------All admins------------------------------------------------ */
function AllAdmins() //Owner
{
  $.ajax({
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({_id:id}),
         url: '/community/communityOwner/'+id,
         success: function (response) {
           if(response.length==0)
           {
                 $('#comlist').append("\
                 <div class='col-sm-12 allcoms well well-sm' style='margin-top:5px;font-weight:bold'>\
                 <center>Something Went Worng No Owner Info</center>\
                 </div>\
                 ");
           } else {
                  $('#commuity-owner-detail').append(createadmindetaildivCommunityProfile(response[0],0));
                  AdminList();
               }
         },
         error: function (err) {
             notie.alert({type: 3, text:'Something went wrong!', time: 2})
         }
     });
}
function AdminList() //admins
{
  $.ajax({
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({_id:id}),
         url: '/community/allcomadmins/'+id,
         success: function (response) {
           if(response.length!=1)
           {
               for(i=0;i<response.length-1;i++)
               {
                 $('#commuity-admins-detail').append(createadmindetaildivCommunityProfile(response[i].AllAdmins[0],1));
               }
            }
            if(vali.existDecument($('#membersDiv-4joinedUser')) && (TotalUserCountForProfilePage<4))
            {
              initUserListForProfilePageForJoinedUsers(TotalUserCountForProfilePage);
            }
         },
         error: function (err) {
             notie.alert({type: 3, text:'Something went wrong!', time: 2})
         }
     });
}
//----------------------------------------------------------------------------------------------------------
initGlobalDiscussions();
function initGlobalDiscussions(){
  if(vali.existDecument($('#needGlobalInProfile')))
  {
    $.ajax({
         type: 'POST',
         contentType: 'application/json',
         data: JSON.stringify({com:id}),
         url: '/community/showOnlyglobal/'+id,
         success: function (response) {
           me = response.user;
           response = response.f0;
           if(response.length)
           {
             for(var i=0 ; i < response.length ; i++)
             {
               $('#needGlobalInProfile').append(createGlobalDiscussionForNonUser(response[i],me,id));
               if(response[i].externalUrl)
               {
                 getWebsiteDetail(response[i].externalUrl,'#discussionLinkPreview'+response[i]._id,true,0,true);
               }
               // if(response[i].images){
               //   if(response[i].images.length){
               //     for(var j=0 ; j<response[i].images.length ; j++ )
               //     {
               //       fillReleventColorInDiv('/Upload/DiscussionImages/'+response[i].images[j],'#discussionImageDiv'+response[i]._id);
               //     }
               //  }
               // }
            }
           }
         },
         error: function (err) {
             notie.alert({type: 3, text:'Something went wrong!', time: 2})
         }
     });
  }
}
/*----------------------------------------------------------------------------------------------------------------*/
function showHideDescription(flag){
  if(flag)
  {
    $(".short-description").css('display','none');
    $(".full-description").fadeIn();

    $(".more-description-btn").css('display','none');
    $(".less-description-btn").css('display','inline');

  }else{
    $(".full-description").css('display','none');
    $(".short-description").fadeIn();

    $(".less-description-btn").css('display','none');
    $(".more-description-btn").css('display','inline');
  }
}