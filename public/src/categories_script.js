// var selectCategories = []
// var checkCateg = document.querySelectorAll("input[type=checkbox]:checked")

// for (var i = 0; i < checkCateg.length; i++) {
//   array.push(checkCateg[i].value)
// }

// return selectCategories;

// var selected = new Array();

// $(document).ready(function() {

//   $("input:checkbox[name=type]:checked").each(function() {
//        selected.push($(this).val());
//   });

// });


function getSelectedChbox(frm) {
  var selchbox = [];        

  var inpfields = frm.getElementsByTagName('input');
  var nr_inpfields = inpfields.length;

  for(var i=0; i<nr_inpfields; i++) {
    if(inpfields[i].type == 'checkbox' && inpfields[i].checked == true) selchbox.push(inpfields[i].value);
  }

  return selchbox;
}

document.getElementById('btntest').onclick = function(){
  var selchb = getSelectedChbox(this.form);
  alert(selchb);
}
