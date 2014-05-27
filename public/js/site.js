/**
 * Created by cotizo on 5/27/2014.
 */

function newPost() {
    var title = $('#new-post-title').val();
    var body = $('#new-post-body').val();
    var tags = $('#new-post-tags').val().split(/[ |;|,]+/).map(function (x) { return x ? x.trim() : x; }).filter(function (x) { return x ? x.length > 0 : false; });
    var url = $('#new-post-url').val();

    $.ajax('/article', {
        data: {
            title: title,
            content: body,
            tags: tags,
            url: url
        },
        type: "PUT"
    }).fail(function () {
        alert("Could not post article");
    }).success(function () {
        location.reload();
    });

    $("#new-post").modal('hide');
}