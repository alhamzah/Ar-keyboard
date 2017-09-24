var p_length = 0;
$(function(){
    var $write = $('#write'),
        shift = false,
        capslock = false;
     
    var key_matching = {'1': '١', '2': '٢', '3': '٣', '4': '٤', '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩', '0': '٠',
                        'q': 'ض', 'w': 'ص', 'e': 'ث', 'r': 'ق', 't': 'ف', 'y': 'غ', 'u': 'ع', 'i': 'ه', 'o': 'خ', 'p': 'ح', '[': 'ج', ']': 'د',
                             'a': 'ش', 's':'س', 'd':'ي', 'f':'ب', 'g':'ل', 'h':'ا', 'j':'ت', 'k':'ن', 'l':'م', ';':'ك', "'":'ط',
                                 'z':'ئ', 'x':'ء', 'c':'ؤ', 'v':'ر', 'b':'لا', 'n':'ى', 'm':'ة', ',':'و', '.':'ز', '/':'ظ'}

  $($write).bind('keyup', function() {

        var input = $write.val(),
            abs_length = input.length - p_length

        if (abs_length > 0) {
            output = '';
            for (i = 0; i < input.length; i++) {
                key = input[i].toLowerCase()
                if (key in key_matching) {
                    output += key_matching[key]
                }
                else {
                    output += input[i]
                }
            }
            $write.val(output);
        }
        p_length = $write.val().length;
})
    $('#keyboard li').click(function(){
        var $this = $(this);
        if (!($this.hasClass('capslock') || $this.hasClass('delete')))
            character = $this.text()[0]; // If it's a lowercase letter, nothing happens to this variable

        // Shift keys
        if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
            $('.number').toggleClass('uppercase');
            $('.letter').toggleClass('uppercase');
            $('.symbol span').toggle();
             
            shift = (shift === true) ? false : true;
            capslock = false;
            return false;
        }
         
        // Caps lock
        if ($this.hasClass('capslock')) {
            $('.number').toggleClass('uppercase');
            $('.letter').toggleClass('uppercase');
            capslock = (capslock === true) ? false : true;
            return false
        }
         
        // Delete
        if ($this.hasClass('delete')) {
            var html = $write.text();
            $write.html(html.substr(0, html.length - 1));
            return false
        }
         
        // Special characters
        if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
        if ($this.hasClass('space')) character = ' ';
        if ($this.hasClass('tab')) character = "\t";
        if ($this.hasClass('return')) character = "\n";
         
        // Uppercase letter
        if (!capslock && character in key_matching) {character = key_matching[character]}
        else if ($this.hasClass('uppercase') && shift == true) {character = character.toUpperCase()}
        
        // Remove shift once a key is clicked.
        if (shift === true) {
            $('.symbol span').toggle();
            if (capslock === false) $('.letter').toggleClass('uppercase');
             
            shift = false;
        }
        // Add the character
        $write.html($write.text() + character);
        p_length = $write.val().length;
    });
});

