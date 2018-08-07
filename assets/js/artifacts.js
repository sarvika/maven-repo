function copy(g, a, v) {
    var value = `<!-- https://opensource.sarvika.com/maven-repo -->\n\
<dependency>\n\
\t<groupId>${g}</groupId>\n\
\t<artifactId>${a}</artifactId>\n\
\t<version>${v}</version>\n\
</dependency>`;
    $('#dependencyModalLabel').html(`Copy <code>${g}:${a}:${v}</code>`);
    $('#modalCode').text(value);
    $('#modalCode').each(function(i, e){hljs.highlightBlock(e)});
}

function generateArtifactDisplayContent(g, a, v) {
    var html = `<div class="atrifact-line">\
    <button type="button" class="btn btn-info" onclick="JavaScript:copy('${g}', '${a}', '${v[0]}');" data-toggle="modal" data-target="#dependencyModal">\
        <span class="btn-inner--icon"><i class="ni ni-single-copy-04"></i></span>\
    </button>\
    <button type="button" class="btn btn-outline-primary col-lg-3">${g}</button>\
<button type="button" class="btn btn-outline-success col-lg-3">${a}</button>\
    <div class="btn-group col-lg-3" style="padding-left: 0 !important;">\
      <button type="button" class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="width: 100%;">${v[0]}</button>\
      <div class="dropdown-menu">`;
    for (var i = 0 ; i < v.length ; i++) {
        html += `<a class="dropdown-item" href="JavaScript:;" onclick="JavaScript:copy('${g}', '${a}', '${v[i]}');" data-toggle="modal" data-target="#dependencyModal">${v[i]}</a>`;
    }
    html += '</div>\
    </div></div>';

    return html;
}

$(document).ready(function(){
    $.ajax('artifacts.json', {
        type: 'GET',
        dataType: 'JSON',
        success: function(response) {
            for (var i = 0 ; i < response.length ; i++) {
                var artifact = response[i];

                var html = generateArtifactDisplayContent(artifact.groupId, artifact.artifactId, artifact.versions);
                $('#artifacts').append(html);
            }
        }
    });
});
