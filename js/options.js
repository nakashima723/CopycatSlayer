var showSlyr = function () {
  var divNum1 = $('#tabBox1').length;
  var divNum2 = $('#tabBox2').length;
  if (divNum1 === 1) {
    $('#tabBox1').append('<div id=\"title\"><center><h1 style=\"margin-top:15px; margin-bottom:10px;\">�p�N�c�C�X���C���[</h1></div><div id =\"main\" style =\'margin: 0 auto;  padding: 15px 40px; width: 750px;\'><dl id=\"hisMenu\" style =\'margin: 30px auto; width: 100%;\'></dl><div id=\"setting_div\"></div></dl></div>');
  }
  if (divNum2 === 1) {
    $('#tabBox2').append('<div id=\"m-title\"><center><h1 style=\"margin-top:15px; margin-bottom:10px;\">�����n�` for Google</h1></div><div id =\"m-main\" style =\'margin: 0 auto;  padding: 15px 40px; width: 750px; \'><dl id=\"m-hisMenu\" style =\'margin: 30px auto; width: 100%;\'></dl><div id=\"m-setting_div\"></div></dl></div></div></br></center></div>');
  }

  chrome.storage.local.get(function (items) {
    if (items.m_bar === "off") {
      $('#m-title').append('<center></br><button id="slyr-show" style="padding:20px 50px; background-color:#cc0000; border:none; color:#FFF;">URL�ǉ��p�o�[�̕\����ON�ɂ���</button></center></div>');
      $("#slyr-show").click(function () {
        var bar_mode = new Object();
        bar_mode['m_bar'] = "on";
        chrome.storage.local.set(bar_mode, function (items) {
          alert("URL�ǉ��p�o�[�̕\����ON�ɂ��܂����B\n�o�[��\�����������y�[�W���X�V����Ɣ��f����܂��B");
          $('#slyr-show').hide();
        });
      });
    }
  });

  //�p�N�c�C�X���C���[
  var str_ex1 = "��F�ǃh���Ώ��@",
    str_ex2 = "��F�������삵�A�ȉ��̃c�C�[�g�ōŏ��ɔ��\�����C���X�g�ł��B",
    str_ex2 = "��F�������삵�A�ȉ��̃c�C�[�g�ōŏ��ɔ��\�����C���X�g�ł��B",
    str_ex3 = "��Fhttps://twitter.com/nakashima723/status/493780492345307136",
    str_ex4 = "��F���쌠�ŕی삳�ꂽ�摜���A���f�œ]�ڂ����p���Ă��܂��B",
    str_ex4_after = "���쌠�ŕی삳�ꂽ�摜���A���f�œ]�ڂ����p���Ă��܂��B",
    str_ex5 = "��F�s�{�ӂȕǃh�� �Ώ��@ -RT -nakashima723.info",
    str_al_save_new = "���L���܂��͓��e�ɕs���̂��鍀�ڂ�����܂��B\n�u�C�Ӂv�̍��ڈȊO�͂��ׂē��͂��Ă��������B",
    str_saved = "���͓��e��ۑ����܂����B",
    str_edit_save = "�ҏW���e��ۑ�����",
    str_edit_saved = "�ҏW���e��ۑ����܂����B",
    str_url_copy = "����URL���N���b�v�{�[�h�ɃR�s�[",
    str_url_clear = "���̍��ڂ̖���URL�����ׂč폜";
  str_deleted = "���͓��e���폜���܂����B",
    del_report = "�폜����ƁA���̍��ڂ�URL�ƃA�J�E���g�̋L�^�͂��ׂĔj������܂��B\n\n����m�F�Ƃ��Ďg�p�����ꍇ�Ȃǂ������A��{�I�ɂ́u���ڂ��\���ɂ���v�I�v�V�������g�p���邱�Ƃ��������߂��܂��B\n\n�{���ɂ��̍��ڂ��폜���܂����H",
    del_report2 = "�{���ɂ�낵���ł����H",
    str_input = "���͂���",
    str_close = "�Ƃ���",
    str_nosetting = "�u��{�ݒ�v�Ɓu�񍐓��e�v���L������ƁA�c�C�[�g�̌����E�񍐋@�\���g����悤�ɂȂ�܂��B",
    str_his_title = "<h2>�񍐗����̊m�F�ƊǗ�</h2><font size=\"-1\">�����󋵂̋L�^�́A�u�񍐂���URL�v�Ɓu�A�J�E���g�v�̈ꗗ����s���܂��B�i�蓮�j</font>",
    str_edit = "�ҏW����",
    str_edit_report = "�񍐓��e��ǉ��E�ҏW",
    str_setting = "��{�ݒ�",
    str_setting_ex = "<font size=\"-1\">Twitter������<a href=\"https://support.twitter.com/forms/dmca\"><strong>���쌠�N�Q�񍐃t�H�[��</strong></a>�ɓ��͂�����e��ݒ肵�Ă��������B<br/>�Z�������ȂǁA���ׂĂ̕񍐂ɋ��ʂ�����͓��e�ƂȂ�܂��B</font>",
    str_taro = "��F���Y",
    str_yamada = "��F�R�c",
    str_company = "��F���c��";

  //�o�^����Ă���񍐓��e�̐��𔻒�
  var repCounter = function () {
    chrome.storage.local.get(function (items) {
      //console.log(Object.keys(items));
      var length = Object.keys(items).length,
        target = "report",
        repArr = [];
      if (length == 0) {
        alert(str_nosetting);
      }
      for (i = 0; i < length; i++) {
        var wordArr = Object.keys(items);
        var str = " " + wordArr[i];
        if (str.indexOf(" " + target) !== -1) {
          repArr.push(wordArr[i]);
        }
      }
      var repNum = {
        "repNum": repArr.length
      };
      chrome.storage.local.set(repNum, function (items) {});

      var m_target = "m_report",
        m_repArr = [];
      for (i = 0; i < length; i++) {
        var wordArr = Object.keys(items);
        var str = " " + wordArr[i];
        if (str.indexOf(" " + m_target) !== -1) {
          m_repArr.push(wordArr[i]);
        }
      }
      var m_repNum = {
        "m_repNum": m_repArr.length
      };
      chrome.storage.local.set(m_repNum, function (items) {});

    });
  }
  repCounter();
  // chrome.storage�ɕۑ������f�[�^�̕\��
  var showSetting = function () {
    chrome.storage.local.get(function (items) {
      if (items.fullname == undefined) {
        $('#setting').text(str_input)
        $('#setting').css({
          'background-color': '#00aced',
          'color': '#F5F5F5'
        });
      } else {
        $('#setting').css({
          'background-color': '#FFF',
          'color': '#222'
        });
      }
      if (items.m_name == undefined) {
        $('#m-setting').text(str_input)
        $('#m-setting').css({
          'background-color': '#cc0000',
          'color': '#F5F5F5'
        });
      } else {
        $('#m-setting').css({
          'background-color': '#FFF',
          'color': '#222'
        });
      }
      if (items.m_name !== undefined) {
        $('#m-name').val(items.m_name);
        $('#m-family').val(items.m_family);
        $('#m-email').val(items.m_email);
        $('#m-company').val(items.m_company);
        $('#email').val(items.email);
        $('#m-statement1,#m-statement2,#m-statement3').prop('checked', true);
      }
      if (items.fullname !== undefined) {
        $('#main').prepend(str_his_title);
      }
      $('#account_name').val(items.account_name);
      $('#fullname').val(items.fullname);
      $('#company').val(items.company);
      $('#job').val(items.job);
      $('#email').val(items.email);
      $('#address').val(items.address);
      $('#city').val(items.city);
      $('#state').val(items.state);
      $('#postal').val(items.postal);
      $('#country').val(items.country);
      $('#phone_number').val(items.phone_number);
      $('#faxnumber').val(items.faxnumber);
      if (items.fullname !== undefined) {
        $('#statement1,#statement2,#statement3').prop('checked', true);
        $('#statement4').val('���̒ʒm�̏��͐��m�ł��B���́A���쌠���L�҂̑㗝�Ƃ��čs�����錠���������Ă��邱�Ƃ����U�̏ꍇ�͋U�؍߂ɖ���邱�Ƃ𗝉����Ă��܂��B');
      }
    });
  }

  const showReports = function () {
    chrome.storage.local.get(function (items) {
      for (let i = 0; i < items.repNum; i++) {
        if (items[`art_type${i}`] === undefined) {
          $(`input[name='art_type${i}']`).val(['image' + i]);
        } else {
          $(`input[name='art_type${i}']`).val([items[`art_type${i}`]]);
        }

        if (items[`owner_type${i}`] === undefined) {
          $(`input[name='owner_type${i}']`).val(['owner' + i]);
        } else {
          $(`input[name='owner_type${i}']`).val([items[`owner_type${i}`]]);
        }

        $(`#report${i}_input`).val(items[`report${i}`]);
        $(`#owner_name${i}_input`).val(items[`owner_name${i}`]);
        $(`#hide_pop${i}`).prop('checked', items[`hide_pop${i}`]);
        $(`#hide_his${i}`).prop('checked', items[`hide_his${i}`]);
        $(`#tweet_image_original${i}`).val(items[`tweet_image_original${i}`]);
        $(`#tweet_url_original${i}`).val(items[`tweet_url_original${i}`]);
        $(`#tweet_image_infringement${i}`).val(items[`tweet_image_infringement${i}`]);
        $(`#query${i}`).val(items[`query${i}`]);
      }

      if (items.repNum > 0 || items.fullname !== undefined) {
        $('#new_report').css({
          'background-color': '#00aced',
          'color': '#F5F5F5'
        });
      }

      for (let i = 0; i < items.m_repNum; i++) {
        $(`#m-report${i}_input`).val(items[`m_report${i}`]);
        $(`#m-hide_pop${i}`).prop('checked', items[`m_hide_pop${i}`]);
        $(`#m-hide_his${i}`).prop('checked', items[`m_hide_his${i}`]);
        $(`#m-infringement${i}`).val(items[`m_infringement${i}`]);
        $(`#m-original${i}`).val(items[`m_original${i}`]);

        const holder = items[`m_holder${i}`];

        if (holder === undefined || holder === 'self') {
          $(`#author-type${i}`).prop('checked', true);
          $(`#m-holder${i}`).val('self');
        } else {
          $(`#m-holder${i}`).val(holder);
          $(`#attoney-type${i}`).prop('checked', true);
        }

        $(`#m-query${i}`).val(items[`m_query${i}`]);
      }

      if (items.m_repNum > 0) {
        $('#m-new_report').css({
          'background-color': '#cc0000',
          'color': '#F5F5F5'
        });
      }
    });
  }


  //�p�N�c�C�X���C���[
  $(function () {
    chrome.storage.local.get(function (items) {
      $('#setting_div').append("<h2>" + str_setting + "</h2>" + str_setting_ex + "<br/><br/><dl id=\"acMenu\" style =\'margin:0 auto; width: 100%;\'><dt><button id=\"setting\">" + str_edit + "</button><br /></dt><dd style =\'margin:0 30px auto; display:none; width:\"100%;\"'>�{�v���O�����͕񍐑ΏۂƂȂ钘�앨�̐����Ȍ����҂̕��A�܂��͂��̑㗝�l�݂̂����p���������܂��B���앨�̒�`��A�����g�̌����̗L���ɂ��Ă͊e���ł��m�F���������B<br /><br /><strong>�A����</strong><br />���Ȃ��̖{���i�t���l�[���j:<br /><input id=\"fullname\" type=\"text\" value=\"��F�R�c���Y\" /><br />��Ж��E����:<br /><input id=\"company\" type=\"text\" value=\"��F���c��\" /><br />�������F<br /><input id=\"job\" type=\"text\" /><br />���[�� �A�h���X : <input id=\"email\" type=\"text\" /><br />�Z���P�i�Ԓn�E�������E�����ԍ��j�F<br /><input id=\"address\" type=\"text\" /><br />�Z���Q�i�s�撬�����j�F<br /><input id=\"city\" type=\"text\" /><br />�Z���R�i�s���{�����j�F<br /><input id=\"state\" type=\"text\" /><br />�X�֔ԍ��F<br /><input id=\"postal\" type=\"text\" /><br />���Z���F<br /><input id=\"country\" type=\"text\" /><br />�d�b�ԍ��i�C�Ӂj�F<br /><input id=\"phone_number\" type=\"text\" /><br />FAX�ԍ��i�C�Ӂj�F<br /><input id=\"faxnumber\" type=\"text\" /><br />������Twitter�A�J�E���g���i�C�Ӂj<br /><font size=\"-1\">���L�����Ă����ƁA�����̃A�J�E���g���Ă̔����RT�����O�ł��܂��B<br>�@���p@������͂��Ă��������B�i��F@nakashima723�j<br /></font><input id=\"account_name\" type=\"text\" value=\"��F@nakashima723\" /><br /><strong>�@�I�Ȑ鐾�F</strong><br /><font size=\"2.8em\"><br /><input id=\"statement1\" type=\"checkbox\">�̈ӂɕ񍐑f�ނ܂��͊������d��ȐN�Q�����Ă���ƋU�����ꍇ�A17 U.S.C. �� 512(f) (�č����쌠�@) �Ɋ�Â��A���͑i�ה�p����ѕٌ�m��p���܂ނ����鑹�Q�ɂ��ĐӔC������\�������邱�Ƃ𗝉����Ă��܂��B<br /><br /><input id=\"statement2\" type=\"checkbox\">���͐\�����Ă��ԗl�ł̑f�ނ̎g�p���A���쌠�ҁA���̑㗝�l�A�܂��͖@���ɂ���ċ��e����Ă��Ȃ����Ƃ��A�ǐS�ɏ]�������ɔF�����Ă��܂��B<br /><br /><input id=\"statement3\" type=\"checkbox\">�{�v���O�����͓��Y�t�H�[���ւ̓��͂�⏕�E�ȕ։�������̂ł���A���M�����񍐂̓��e�ƕ񍐌��ʂɂ��āA�v���O��������҂͈�؂̐ӔC�𕉂�Ȃ����Ƃ��������܂��B<br /><br /></font>�ȉ��̕��͂����̋󗓂ɐ��m�ɓ��͂��Ă��������B<br /><blockquote cite=\"https://support.twitter.com/forms/dmca\">���̒ʒm�̏��͐��m�ł��B���́A���쌠���L�҂̑㗝�Ƃ��čs�����錠���������Ă��邱�Ƃ����U�̏ꍇ�͋U�؍߂ɖ���邱�Ƃ𗝉����Ă��܂��B</blockquote><textarea id=\"statement4\" rows=\"3\"></textarea><br /><input id=\"save_setting\" type=\"submit\" value=\"���̓��͓��e��ۑ�\" />�@<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /><br /></dd><h2>" + str_edit_report + "</h2>");
      $(function () {
        //�o�^����Ă���񍐓��e�̐��𔻒�
        // �I�v�V�����f�[�^�̍X�V
        $('#save_setting').click(function () {
          var account_name = $('#account_name').val();
          var fullname = $('#fullname').val();
          var company = $('#company').val();
          var job = $('#job').val();
          var email = $('#email').val();
          var address = $('#address').val();
          var city = $('#city').val();
          var state = $('#state').val();
          var postal = $('#postal').val();
          var country = $('#country').val();
          var phone_number = $('#phone_number').val();
          var faxnumber = $('#faxnumber').val();
          var statement1 = $('#statement1').prop('checked');
          var statement2 = $('#statement2').prop('checked');
          var statement3 = $('#statement3').prop('checked');
          var statement4 = $('#statement4').val();
          //console.log(account_name);
          if (fullname === "" || company === "" || job === "" || email === "" || address === "" || city === "" || state === "" || postal === "" || country === "" || statement1 !== true || statement2 !== true || statement3 !== true || statement4 !== '���̒ʒm�̏��͐��m�ł��B���́A���쌠���L�҂̑㗝�Ƃ��čs�����錠���������Ă��邱�Ƃ����U�̏ꍇ�͋U�؍߂ɖ���邱�Ƃ𗝉����Ă��܂��B') {
            alert(str_al_save_new);
          } else {
            var obj = new Object();
            obj['account_name'] = account_name;
            obj['fullname'] = fullname;
            obj['company'] = company;
            obj['job'] = job;
            obj['email'] = email;
            obj['address'] = address;
            obj['city'] = city;
            obj['state'] = state;
            obj['postal'] = postal;
            obj['country'] = country;
            obj['phone_number'] = phone_number;
            obj['faxnumber'] = faxnumber;
            obj['slyr_mode'] = "pakutwi";
            chrome.storage.local.set(obj, function () {});
            location.reload();
            alert(str_saved);
          }
        });
        $('#clear').click(function () {
          chrome.storage.local.clear(function () {
            location.reload();
          });
          alert(str_deleted);
        });
        // �I�v�V�����f�[�^�̕\��
        showSetting();
        showReports();
      });
      //�񍐗����ꗗ�𐶐�
      if (items.repNum > 0) {
        $('#acMenu h2').after("<font size=\"-1\">�N�Q�̓��e���ƂɁA�^�C�g���⌳��i��URL��ݒ肵�Ă��������B</br>�u�񍐗����ꗗ�ɕ\�����Ȃ��v�Ƀ`�F�b�N������ƁA�I�v�V�����y�[�W�̕\�����y�ʉ��ł��܂��B</br></br></font>");
      }
      for (var i = 0; i < items.repNum; i++) {
        window["thisUrlArr" + i] = items["urlArr" + i];
        window["thisUrlDateArr" + i] = items["urlDateArr" + i];
        window["thisFinArr" + i] = items["urlFinArr" + i];
        window["thisFinDateArr" + i] = items["urlFinDateArr" + i];
        window["thisAccArr" + i] = items["accNameArr" + i];
        window["thisSusArr" + i] = items["accSusArr" + i];
        window["thisSusDateArr" + i] = items["accSusDateArr" + i];

        // �o�O�C��
        if (window["thisFinArr" + i].length !== window["thisFinDateArr" + i].length) {
          var dif = window["thisFinDateArr" + i].length - window["thisFinArr" + i].length;
          window["thisFinDateArr" + i].splice(0, dif);
          var obj = {};
          obj["urlFinDateArr" + i] = window["thisFinDateArr" + i];
          chrome.storage.local.set(obj, function () {});
        }

        // �d���̂Ȃ��ꗗ�𐶐�
        window["accUniArr" + i] = window["thisAccArr" + i].filter(function (a, b, self) {
          return self.indexOf(a) === b;
        });
        window["finUniArr" + i] = window["thisFinArr" + i].filter(function (a, b, self) {
          return self.indexOf(a) === b;
        });
        var accUniNum = window["accUniArr" + i].length;
        var urlNum = window["thisUrlArr" + i].length;
        var urlFinNum = window["thisFinArr" + i].length;
        var accNum = items["accNameArr" + i].length;
        var susNum = items["accSusArr" + i].length;
        var thisTitle = (i + 1) + ": " + items["report" + i];
        var hide_his = items["hide_his" + i];

        $('#acMenu').append('<dt><button id="report' + i + '"></button></dt>');
        $('#report' + i).text(thisTitle);
        $('#acMenu').append('<dd id = "form' + i + '"><strong>���̕񍐓��e�̖��O</strong><br /><font size ="-1">�����̕񍐓��e�Ƌ�ʂł���悤�ɁA�킩��₷�����O�����Ă��������B</font><input id="report' + i + '_input" type="text" style="margin-bottom:10px" /><input type="checkbox" id="hide_pop' + i + '" style="margin-bottom:30px">�����p�|�b�v�A�b�v�̈ꗗ�ɕ\�����Ȃ��@<input type="checkbox" id="hide_his' + i + '" style="margin-bottom:30px">�񍐗����ꗗ�ɕ\�����Ȃ�<br/>���쌠�҂̖��O�F<br /><input id="owner_name' + i + '_input" type="text" style="margin-bottom:10px" /><br/>�I���W�i����i�̓��e�F<textarea id="tweet_image_original' + i + '"></textarea><br />�I���W�i����i���m�F�ł���URL�F<br /><font size ="-1">���N�Q�c�C�[�g��URL�ł͂Ȃ��A�����g�ŃA�b�v���[�h�����c�C�[�g��T�C�g�Ȃ�<br />�@���쌠�N�Q�ɂ�����Ȃ��g�p���URL���L�����Ă�������.</font><br/><input id="tweet_url_original' + i + '" type="text" style="width:600px"/><br />���쌠�N�Q�̓��e�F<textarea id="tweet_image_infringement' + i + '"></textarea><br />�N�Q�c�C�[�g�̌����Ɏg�����F<br /><font size ="-1">���X�y�[�X�ŋ�؂�ƕ������͂ł��܂��B�P��̑O�ɔ��p�Łu-�i�}�C�i�X�j�v������ƁA<br />�@���̒P����܂ރc�C�[�g���������ʂ��珜�O����܂�.</font><br /><input id="query' + i + '" type="text" style="width:600px"/><br />��i�̎�ށF<br /><input type="radio" name="art_type' + i + '" value="image' + i + '" id="image_type' + i + '" style="margin-bottom:40px">�C���X�g�E�ʐ^�E�G��@�@<input type="radio" name="art_type' + i + '" value="movie' + i + '" id="movie_type' + i + '" style="margin-bottom:40px">����@�@<input type="radio" name="art_type' + i + '" value="writing' + i + '" id="writing_type' + i + '" style="margin-bottom:40px">����<br/>�񍐎҂̑����F<br /><input type="radio" name="owner_type' + i + '" value="owner" id="owner_type' + i + '" style="margin-bottom:40px">���쌠�Җ{�l�@�@<input type="radio" name="owner_type' + i + '" value="represent" id="represent_type' + i + '" style="margin-bottom:40px">���쌠�҂̐����ȑ㗝�l�@<br/><center><input id="save' + i + '" type="submit" value="���̓��͓��e��ۑ�" />�@<input class="closure" type="submit" value="' + str_close + '" /><br /><button id ="del_report' + i + '" style="font-size:0.9em; background-color:#666; color:#fff;">���̍��ڂ��폜</button></center><br /><br /></dd>');

        eval("$(\'#del_report" + i + "\').hide();");
        if (hide_his !== true) {
          eval("$(\'#hisMenu\').append(\'<dt><button id=\"history" + i + "\" style=\"margin-bottom:10px;\">���̖��ݒ�</button><br/><span id = \"reported" + i + "\"><font size = \"-1\">�@���񍐁F " + urlNum + "���@ �񍐂��݁F " + urlFinNum + "���@ �������ꂽ�A�J�E���g���F " + susNum + "</font><br /></span><br/></dt>\');");

          //����URL�E�񍐍ς�URL�̃{�^����ǉ�
          eval("$(\'#hisMenu\').append(\'<dd id=\"hisBox" + i + "\"><dl class =\"hisBoxMenu\" style=\"margin: 0 auto; \"><dt><button id=\"urlHis" + i + "\">����URL�ꗗ</button><dd id = \"urlBox" + i + "\"><div id = \"urlTable" + i + "\"></div></dd></dt></dl><dl class =\"finBoxMenu\" style=\"margin:0 auto ;\"><dt><button id=\"finHis" + i + "\">�@�񍐂���URL�ꗗ</button><dd id = \"finBox" + i + "\"><div id = \"finTable" + i + "\"></div></dd></dt></dl><dl class =\"accBoxMenu\" style=\"margin:0 auto ;\"><dt>�@ <button id=\"accHis" + i + "\">�A�J�E���g��URL�ꗗ</button><dd id = \"accBox" + i + "\"><div id = \"accTable" + i + "\"></div></dd></dt></dl><dl class =\"susBoxMenu\" style=\"margin:0 auto 0;\"><dt><button id=\"susHis" + i + "\">�@�������݃A�J�E���g�ꗗ</button><dd id = \"susBox" + i + "\"><div id = \"susTable" + i + "\"></div></dd></dt></dl></dd>\');");

          eval("$(\'#history" + i + "\').text(thisTitle);");

          eval("$(\'#urlHis" + i + "\').text('����URL�ꗗ (" + urlNum + "��)');");
          eval("$(\'#urlHis" + i + "\').css({\"color\":\"#FFF\",\"background-color\":\"#888\"});");
          eval("$(\'#finHis" + i + "\').text('�񍐂���URL�ꗗ (" + urlFinNum + "��)');");
          eval("$(\'#finHis" + i + "\').css({\"color\":\"#F4F4F4\",\"background-color\":\"#666\"});");
          eval("$(\'#accHis" + i + "\').text('�A�J�E���g�ʈꗗ (" + accUniNum + "��)');");
          eval("$(\'#accHis" + i + "\').css({\"color\":\"#F6F6F6\",\"background-color\":\"#444\"});");
          eval("$(\'#susHis" + i + "\').text('�������݃A�J�E���g�ꗗ (" + susNum + "��)');");
          eval("$(\'#susHis" + i + "\').css({\"color\":\"#F8F8F8\",\"background-color\":\"#222\"});");
          eval("var susHis_txt = $(\'#susHis" + i + "\').text();");
          var a = susHis_txt.split("(");
          var b = a[1].split(")");
          eval("var nowSusNum" + i + " = b[0].slice(0,-1);");

          //0���̂Ƃ���URL�ꗗ�{�^�����B��
          eval("if (urlNum == 0) $(\'#urlHis" + i + "\').hide();");
          eval("if (urlFinNum == 0) {$(\'#finHis" + i + "\').hide(); $(\'#accHis" + i + "\').hide();} ");
          eval("if (susNum == 0) $(\'#susHis" + i + "\').hide();");

          //����URL�̈ꗗ��ǉ�
          for (var j = 0; j < urlNum; j++) {
            eval("var urlThis = thisUrlArr" + i + "[" + j + "];");
            eval("var dateThis = thisUrlDateArr" + i + "[" + j + "];");
            eval("$(\'#urlTable" + i + "\').prepend(\'<table width = \"100%\"><tr><td style = \"margin : 0 auto;\" width = \"85%\"><font size = \"2.5\"><span id =\"urlNum" + i + "_" + j + "\"></span><a href =\"" + urlThis + "\" target = \"_blank\"><span id =\"urlLine" + i + "_" + j + "\"></span></a></font><br /><font size = \"1.8\"><span class = \"alignright\" id =\"urlDateLine" + i + "_" + j + "\"></span><br /><br /></font></td><td><font size = \"1.8\"><button class = \"alignright\" id=\"urlDel" + i + "_" + j + "\">�폜</button></font></td></tr></table>\');");
            eval("$(\'#urlNum" + i + "_" + j + "\').append(\"" + (j + 1) + ": \");");
            eval("$(\'#urlLine" + i + "_" + j + "\').append(\"" + urlThis + "\");");
            eval("$(\'#urlDateLine" + i + "_" + j + "\').append(\"" + dateThis + "�@" + "\");");
            eval("$(\'#urlDel" + i + "_" + j + "\').click(function(){ var urlHere = $(\'#urlLine" + i + "_" + j + "\').text(); var dateHere = $(\'#urlDateLine" + i + "_" + j + "\').text(); if ($(this).text() == \"�폜\"){ $(this).css({\"color\":\"#F5F5F5\", \"background-color\":\"#222\"}); $(this).text(\'�߂�\'); $(\'#urlNum" + i + "_" + j + ", #urlLine" + i + "_" + j + ", #urlDateLine" + i + "_" + j + "\').css({\"color\":\"#999\"});  for(k = 0; k < thisUrlArr" + i + ".length; k++){ if(thisUrlArr" + i + "[k] == urlHere){ thisUrlArr" + i + ".splice( k,1); thisUrlDateArr" + i + ".splice(k,1);}}  } else { $(this).text(\'�폜\'); $(this).css({\"color\":\"\",\"background-color\":\"\"}); $(\'#urlNum" + i + '_' + j + ", #urlLine" + i + '_' + j + ", #urlDateLine" + i + '_' + j + "\').css(\"color\", \"\"); thisUrlArr" + i + ".push(urlHere); thisUrlDateArr" + i + ".push(dateHere); }});");
          }
          //�A�J�E���g���ꗗ��ǉ�
          for (var j = 0; j < accUniNum; j++) {
            eval("var accThis = accUniArr" + i + "[" + j + "];");
            eval("var nowAccArr" + i + "= [];");
            eval("for(l=0; l<thisAccArr" + i + ".length; l++){ var nowAcc = thisAccArr" + i + "[l]; if(accThis == nowAcc){ nowAccArr" + i + ".push(accThis);}}");
            eval("$(\'#accTable" + i + "\').prepend(\'<table width = \"100%\"><tr><td style = \"margin : 0 auto;\" width = \"85%\"><span id =\"accNum" + i + "_" + j + "\"></span><a href =\"https://twitter.com/" + accThis + "\" target = \"_blank\"><span id =\"accLine" + i + "_" + j + "\"></span></a><font size = \"3\"><span class = \"alignright\" id =\"accNumLine" + i + "_" + j + "\">��@ </span><br /><br /></font></td><td><font size = \"1.8\"><button class = \"alignright\" id=\"susAcc" + i + "_" + j + "\">������</button></font></td></tr></table>\');");
            eval("$(\'#accNum" + i + "_" + j + "\').append(\"" + (j + 1) + ": \");");
            eval("$(\'#accLine" + i + "_" + j + "\').append(\"" + accThis + "\");");
            eval("$(\'#accNumLine" + i + "_" + j + "\').prepend(nowAccArr" + i + ".length);");
            eval("var accRepNum" + i + "= [];");
            eval("accRepNum" + i + ".push(nowAccArr" + i + ".length)");

            //�����L�^�{�^���̕\����ύX
            eval("if (thisSusArr" + i + ".indexOf(accThis) !== -1){$(\'#susAcc" + i + "_" + j + "\').text(\"������\"); $(\'#susAcc" + i + "_" + j + "\').css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); }");

            //�N���b�N�����ʒu�̃A�J�E���g�𓀌�������
            eval("$(\'#susAcc" + i + "_" + j + "\').click(function(){ var d = new Date(); d = d.toLocaleString(); var date = d.slice(0,-3); var id = $(this).attr(\"id\"); var id = $(this).attr(\"id\"); var X=id.split(\"_\"); var x = X[1];�@var accHere = accUniArr" + i + "[x]; console.log(\"�A�J�E���g: \" + accHere); if($(this).text() == \"������\") { $(this).text(\"������\"); $(this).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"������\"); $(id_fin).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); $(id_urlFinLine).css({\"color\":\"#999\"}); $(id_urlFinDateLine).css({\"color\":\"#999\"}); $(id_finNumLine).css({\"color\":\"#999\"}); $(id_urlFinNum).css({\"color\":\"#999\"});}} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"������\"); $(id_sus).css({\"color\":\"#fff\",\"background-color\":\"#222\"});}} if(thisSusArr" + i + ".indexOf(accHere) == -1 ){ thisSusArr" + i + ".push(accHere); thisSusDateArr" + i + ".push(date);} } else if ($(this).text() == \"������\"){$(this).text(\"������\"); $(this).css({\"color\":\"#222\",\"background-color\":\"#fff\"}); for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"������\"); $(id_fin).css({\"color\":\"#222\",\"background-color\":\"#FFF\"}); $(id_urlFinLine).css({\"color\":\"#cc0000\"}); $(id_urlFinDateLine).css({\"color\":\"#222\"}); $(id_finNumLine).css({\"color\":\"#222\"}); $(id_urlFinNum).css({\"color\":\"#222\"}); }} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"������\"); $(id_sus).css({\"color\":\"#222\",\"background-color\":\"#FFF\"});}} for(k=0; k<thisSusArr" + i + ".length; k++){ if(thisSusArr" + i + "[k] == accHere){ thisSusArr" + i + ".splice(k,1); thisSusDateArr" + i + ".splice(k,1); } } } }); ");
          }

          //�񍐂���URL�̈ꗗ��ǉ�
          for (var j = 0; j < urlFinNum; j++) {
            eval("var finThis = thisFinArr" + i + "[" + j + "];");
            eval("var accThis = thisAccArr" + i + "[" + j + "];");
            eval("var finDateThis = thisFinDateArr" + i + "[" + j + "];");
            eval("var finRep" + i + "= [];");

            eval("for(l=0; l<thisFinArr" + i + ".length; l++){if(items.accNameArr" + i + "[j] == thisAccArr" + i + "[l]) finRep" + i + ".push(finThis);}");
            eval("$(\'#finTable" + i + "\').prepend(\'<table width = \"100%\"><tr><td style = \"margin : 0 auto;\" width = \"85%\"><font size = \"2.5\"><span id =\"urlFinNum" + i + "_" + j + "\"></span><a href =\"" + finThis + "\" target = \"_blank\"><span id =\"urlFinLine" + i + "_" + j + "\"></span></a></font><br /><font size = \"1.8\"><span class = \"alignright\" id =\"finNumLine" + i + "_" + j + "\">��@ by <strong><a href=\"https://twitter.com/" + accThis + "\" target=\"_blank\">" + accThis + "</a></strong>�@�@</span><span class = \"alignright\" id =\"urlFinDateLine" + i + "_" + j + "\">�v</span><br /><br /></font></td><td class =\"alignright\"><font size = \"1.8\"><button id=\"susFin" + i + "_" + j + "\">������</button></font></td></tr></table>\');");
            eval("$(\'#urlFinNum" + i + "_" + j + "\').append(\"" + (j + 1) + ": \");");
            eval("$(\'#urlFinLine" + i + "_" + j + "\').append(\"" + finThis + "\");");
            eval("$(\'#urlFinDateLine" + i + "_" + j + "\').prepend(\"" + finDateThis + "�@" + "\");");
            eval("$(\'#finNumLine" + i + "_" + j + "\').prepend(finRep" + i + ".length);");

            //�����L�^�̃{�^���̕\����ύX
            eval("if (thisSusArr" + i + ".indexOf(accThis) !== -1){$(\'#susFin" + i + "_" + j + "\').text(\"������\"); $(\'#susFin" + i + "_" + j + "\').css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); $(\'#urlFinNum" + i + "_" + j + ",#urlFinLine" + i + "_" + j + ", #urlFinDateLine" + i + "_" + j + ", #finNumLine" + i + "_" + j + "\').css(\"color\",\"#999\"); }");

            //�N���b�N�����ʒu�̃A�J�E���g�𓀌�������
            eval("$(\'#susFin" + i + "_" + j + "\').click(function(){var d = new Date(); d = d.toLocaleString(); var date = d.slice(0,-3); var id = $(this).attr(\"id\"); var X=id.split(\"_\"); var x = X[1];�@var finHere = thisFinArr" + i + "[x]; var a = finHere.split(\"/\"); var accHere = a[3];  console.log(\"URL: \" + x + finHere + \"�A�J�E���g: \" + accHere); if ($(this).text() == \"������\"){ for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"������\"); $(id_fin).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); $(id_urlFinLine).css({\"color\":\"#999\"}); $(id_urlFinDateLine).css({\"color\":\"#999\"}); $(id_finNumLine).css({\"color\":\"#999\"}); $(id_urlFinNum).css({\"color\":\"#999\"}); }} for(k=0; k<accUniArr" + i + ".length; k++){ var id_acc = \"#susAcc\" + " + i + " + \"_\" + k; if(accHere == accUniArr" + i + "[k]){ $(id_acc).text(\"������\"); $(id_acc).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"});}} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"������\"); $(id_sus).css({\"color\":\"#fff\",\"background-color\":\"#222\"});}} if(thisSusArr" + i + ".indexOf(accHere) == -1 ){ thisSusArr" + i + ".push(accHere); thisSusDateArr" + i + ".push(date);} } else if ($(this).text() == \"������\"){ $(\'#urlFinNum" + i + "_" + j + ", #urlFinLine" + i + "_" + j + ", #urlFinDateLine" + i + "_" + j + ", #finNumLine" + i + "_" + j + "\').css(\"color\", \"#222\"); for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"������\"); $(id_fin).css({\"color\":\"#222\",\"background-color\":\"#FFF\"}); $(id_urlFinLine).css({\"color\":\"#cc0000\"}); $(id_urlFinDateLine).css({\"color\":\"#222\"}); $(id_finNumLine).css({\"color\":\"#222\"}); $(id_urlFinNum).css({\"color\":\"#222\"}); }} for(k=0; k<accUniArr" + i + ".length; k++){ var id_acc = \"#susAcc\" + " + i + " + \"_\" + k; if(accHere == accUniArr" + i + "[k]){ $(id_acc).text(\"������\"); $(id_acc).css({\"color\":\"#222\",\"background-color\":\"#FFF\"});}} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"������\"); $(id_sus).css({\"color\":\"#222\",\"background-color\":\"#FFF\"}); }} for(k=0; k<thisSusArr" + i + ".length; k++){ if(thisSusArr" + i + "[k] == accHere){ thisSusArr" + i + ".splice(k,1); thisSusDateArr" + i + ".splice(k,1); } } } }); ");
          }

          //�������݃A�J�E���g���ꗗ��ǉ�
          for (var j = 0; j < susNum; j++) {
            eval("var susThis = thisSusArr" + i + "[" + j + "];");
            eval("var susDateThis = thisSusDateArr" + i + "[" + j + "];");
            eval("var nowAccArr" + i + " = [];");
            eval("for(l=0; l<thisAccArr" + i + ".length; l++){ var nowAcc = thisAccArr" + i + "[l]; if(susThis == nowAcc){ nowAccArr" + i + ".push(susThis);}}");
            eval("var susRepNum = nowAccArr" + i + ".length;");
            eval("$(\'#susTable" + i + "\').prepend(\'<table width = \"100%\"><tr><td style = \"margin : 0 auto;\" width = \"85%\"><span id =\"susNum" + i + "_" + j + "\"></span><a href =\"https://twitter.com/" + susThis + "\" target = \"_blank\"><span id =\"susLine" + i + "_" + j + "\"></span></a><span class = \"alignright\" id =\"susNumLine" + i + "_" + j + "\"></span><br /></td><td><font size = \"1.8\"><button class = \"alignright\" id=\"sus" + i + "_" + j + "\" style=\"color:#f5f5f5; background-color:#222; \" >������</button></font></td></tr></table>\');");
            eval("$(\'#susNum" + i + "_" + j + "\').append(\"" + (j + 1) + ": \");");
            eval("$(\'#susLine" + i + "_" + j + "\').append(\"" + susThis + "\");");
            eval("$(\'#susNumLine" + i + "_" + j + "\').append(\"" + susDateThis + "�@" + "\");");
            eval("$(\'#susNumLine" + i + "_" + j + "\').append(\"" + susRepNum + "��\");");

            //�N���b�N�����ʒu�̃A�J�E���g�𓀌�������
            eval("$(\'#sus" + i + "_" + j + "\').click(function(){ var d = new Date(); d = d.toLocaleString(); var date = d.slice(0,-3); var id = $(this).attr(\"id\"); var X=id.split(\"_\"); var x = X[1]; var id_susLine = \"#susLine\" + " + i + " + \"_\" + x;�@var accHere = $(id_susLine).text(); console.log(\"�A�J�E���g: \" + accHere); if($(this).text() == \"������\") { $(this).text(\"������\"); $(this).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); for(k=0; k<accUniArr" + i + ".length; k++){ var id_acc = \"#susAcc\" + " + i + " + \"_\" + k; if(accHere == accUniArr" + i + "[k]){ $(id_acc).text(\"������\"); $(id_acc).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"});}} for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"������\"); $(id_fin).css({\"color\":\"#F5F5F5\",\"background-color\":\"#222\"}); $(id_urlFinLine).css({\"color\":\"#999\"}); $(id_urlFinDateLine).css({\"color\":\"#999\"}); $(id_finNumLine).css({\"color\":\"#999\"}); $(id_urlFinNum).css({\"color\":\"#999\"});}} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"������\"); $(id_sus).css({\"color\":\"#fff\",\"background-color\":\"#222\"});}} if(thisSusArr" + i + ".indexOf(accHere) == -1 ){ thisSusArr" + i + ".push(accHere); thisSusDateArr" + i + ".push(date);} } else if ($(this).text() == \"������\"){$(this).text(\"������\"); $(this).css({\"color\":\"#222\",\"background-color\":\"#fff\"}); for(k=0; k<accUniArr" + i + ".length; k++){ var id_acc = \"#susAcc\" + " + i + " + \"_\" + k; if(accHere == accUniArr" + i + "[k]){ $(id_acc).text(\"������\"); $(id_acc).css({\"color\":\"#222\",\"background-color\":\"#FFF\"});}} for(k=0; k<thisFinArr" + i + ".length; k++){ var id_fin = \"#susFin\" + " + i + " + \"_\" + k; var id_urlFinNum = \"#urlFinNum\" + " + i + " + \"_\" + k; var id_urlFinLine = \"#urlFinLine\" + " + i + " + \"_\" + k; var id_urlFinDateLine = \"#urlFinDateLine\" + " + i + " + \"_\" + k; var id_finNumLine = \"#finNumLine\" + " + i + " + \"_\" + k; if(accHere == thisAccArr" + i + "[k]){ $(id_fin).text(\"������\"); $(id_fin).css({\"color\":\"#222\",\"background-color\":\"#FFF\"}); $(id_urlFinLine).css({\"color\":\"#cc0000\"}); $(id_urlFinDateLine).css({\"color\":\"#222\"}); $(id_finNumLine).css({\"color\":\"#222\"}); $(id_urlFinNum).css({\"color\":\"#222\"}); }} for(k=0; k<nowSusNum" + i + "; k++){ var id_sus = \"#sus\" + " + i + " + \"_\" + k; var id_susLine = \"#susLine\" + " + i + " + \"_\" + k; if(accHere == $(id_susLine).text()){ $(id_sus).text(\"������\"); $(id_sus).css({\"color\":\"#222\",\"background-color\":\"#FFF\"});}} for(k=0; k<thisSusArr" + i + ".length; k++){ if(thisSusArr" + i + "[k] == accHere){ thisSusArr" + i + ".splice(k,1); thisSusDateArr" + i + ".splice(k,1); } } } }); ");

          }
          //URL�̈ꗗ�̉��ɕҏW�p�{�^����ǉ�
          eval("$(\'#urlBox" + i + "\').append(\'<center><input id=\"save_urlArr" + i + "\" type=\"submit\" value=\"" + str_edit_save + "\"/>�@<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /><br/><font size = \"-2\"><input id=\"clear_urlArr" + i + "\" type=\"submit\" value=\"" + str_url_clear + "\" style=\"background-color:#999\; color:#fff; \"/><br/><br/></font></center>\')");
          eval("$(\'#finBox" + i + "\').append(\'<center><input id=\"save_finArr" + i + "\" type=\"submit\" value=\"" + str_edit_save + "\"/>�@<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /></center>\')");
          eval("$(\'#accBox" + i + "\').append(\'<center><input id=\"save_accArr" + i + "\" type=\"submit\" value=\"" + str_edit_save + "\"/>�@<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /></center>\')");
          eval("$(\'#susBox" + i + "\').append(\'<center><input id=\"save_susArr" + i + "\" type=\"submit\" value=\"" + str_edit_save + "\"/>�@<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /></center>\')");

          //�X�N���[���o�[�̃f�U�C��
          var csObj = new Object();
          csObj.theme = "dark";
          eval("$(\"#urlTable" + i + "\").mCustomScrollbar(csObj);");
          eval("$(\"#finTable" + i + "\").mCustomScrollbar(csObj);");
          eval("$(\"#accTable" + i + "\").mCustomScrollbar(csObj);");
          eval("$(\"#susTable" + i + "\").mCustomScrollbar(csObj);");

          //�ҏW���e�ۑ��{�^���̋@�\
          eval("$('#save_urlArr" + i + "').click(function(){ var del = {}; del[\'urlArr" + i + "\'] = thisUrlArr" + i + "; del[\'urlDateArr" + i + "\'] = thisUrlDateArr" + i + ";  alert(str_edit_saved); chrome.storage.local.set(del,function(){	location.reload();});});");
          eval("$('#clear_urlArr" + i + "').click(function(){ var del = {}; del[\'urlArr" + i + "\'] = []; del[\'urlDateArr" + i + "\'] = [];  alert(\"���̍��ڂ̖���URL�����ׂč폜���܂����B\"); chrome.storage.local.set(del,function(){	location.reload();});});");
          eval("$('#save_finArr" + i + ", #save_accArr" + i + ", #save_susArr" + i + "\').click(function(){ var del = {}; del[\'accSusArr" + i + "\'] = thisSusArr" + i + "; del[\'accSusDateArr" + i + "\'] = thisSusDateArr" + i + ";  alert(str_edit_saved); chrome.storage.local.set(del,function(){	location.reload();});});");
        }
        //���ڍ폜�ۑ��{�^���̋@�\	


        //�f�[�^�������Ƃ���̂Ƃ��A�{�^�����\���ɂ���
        eval("if(urlNum == 0 && urlFinNum == 0) {$(\'#history" + i + "\').parent('dt').hide();}");
      }
      if (items.fullname !== undefined && items.report0 !== undefined) {
        var urlSum = 0,
          urlFinSum = 0,
          accUniSum = 0;
        accSusSum = 0;
        for (var i = 0; i < items.repNum; i++) {
          eval("var accSetArr" + i + "= items.accNameArr" + i + ".filter(function (a, b, self) { return self.indexOf(a) === b; });");
          eval("var urlArr = items.urlArr" + i + ";");
          eval("var urlFinArr = items.urlFinArr" + i + ";");
          eval("var accSetArr = accSetArr" + i + ";");
          eval("var accSusArr = items.accSusArr" + i + ";");
          urlSum = urlSum + urlArr.length;
          urlFinSum = urlFinSum + urlFinArr.length;
          accUniSum = accUniSum + accSetArr.length;
          accSusSum = accSusSum + accSusArr.length;
        }
        eval("$(\'#title\').append(\'<div id=\"sum\" style=\"padding:20px;\"><center><strong><font size=\"5em\">���݂̑��v</font><br/><br/>�񍐂���URL�F  " + urlFinSum + "�@�A�J�E���g�����F " + accUniSum + "�@�������݃A�J�E���g�F " + accSusSum + "</strong></center>\');");
        if (urlSum == 0) {
          $('#sum').append("<center><font size=\"-1\"><br/><strong>���񍐂�URL�͂���܂���B</strong></font></center>");
        }
        if (urlSum !== 0) {
          eval("$(\'#sum\').append(\'<center><font size=\"-1\"><br/><strong>���񍐂�URL�� " + urlSum + "������܂��B</strong></font></center>\');");
        }
        if (urlFinSum !== 0) {
          var t_txt1 = "�u���f�]�ڃX���C���[�v�Ōv",
            t_txt2 = "����URL��ʕ񂵂܂����B�A�J�E���g�̑�����" + accUniSum + "���ł����B",
            t_txt3 = "�����A���݂܂łɓ������m�F�ł����̂�",
            t_txt4 = "���ł��B";
          t_txt1 = encodeURIComponent(t_txt1);
          t_txt2 = encodeURIComponent(t_txt2);
          t_txt3 = encodeURIComponent(t_txt3);
          t_txt4 = encodeURIComponent(t_txt4);
          if (accSusSum == 0) {
            $('#sum').append("<center><br/><strong><a href=\"http://twitter.com/share?url=https://twitter.com/nakashima723/status/588309694160113664&text=" + t_txt1 + urlFinSum + t_txt2 + "&related=nakashima723\"><button id=\"tweet\" style=\"padding:20px 50px; background-color:#55acee; border:none; color:#FFF;\">����܂ł̐��ʂ��c�C�[�g</button></a></strong></center>");
          } else if (accSusSum !== 0) {
            $('#sum').append("<center><br/><strong><a href=\"http://twitter.com/share?url=https://twitter.com/nakashima723/status/588309694160113664&text=" + t_txt1 + urlFinSum + t_txt2 + t_txt3 + accSusSum + t_txt4 + "&related=nakashima723\"><button id=\"tweet\" style=\"padding:20px 50px; background-color:#00aced; border:none; list-style:none; color:#FFF;\">����܂ł̐��ʂ��c�C�[�g</button></a></strong></center>");
          }
        }
      }
      //Url�\�������̏I���
      var num = items.repNum;
      if (!items.repNum) {
        var num = 0;
      }
      $('#acMenu').append('<dt><button id="new_report">�V�����񍐓��e���쐬</button></dt>');
      $('#acMenu').append('<dd id="form' + num + '"><strong>�V�����񍐓��e�̖��O</strong><br /><font size="-1">�����̕񍐓��e�Ƌ�ʂł���悤�ɁA�킩��₷�����O�����Ă��������B</font><input id="report' + num + '_input" type="text" value="��F�ǃh���Ώ��@"/><br/>���쌠�҂̖��O�F<br /><input id="owner_name' + num + '_input" type="text" style="margin-bottom:10px" /><br />�I���W�i����i�̓��e�F<textarea id="tweet_image_original' + num + '">��F�������삵�A�ȉ��̃c�C�[�g�ōŏ��ɔ��\�����C���X�g�ł��B</textarea><br />�I���W�i����i���m�F�ł���URL�F<br /><font size="-1">����L�́u���e�v�ɑ����ċL������܂��B<br />�@�N�Q�c�C�[�g��URL�ł͂Ȃ��A�����g�ŃA�b�v���[�h�����c�C�[�g��T�C�g�Ȃ�<br />�@���쌠�N�Q�ɂ�����Ȃ��g�p���URL���L�����Ă��������B</font><br/><input id="tweet_url_original' + num + '" type="text" value="��Fhttps://twitter.com/nakashima723/status/493780492345307136" style="width:600px"/><br />���쌠�N�Q�̓��e�F<textarea id="tweet_image_infringement' + num + '">��F���쌠�ŕی삳�ꂽ��i���A���f�œ]�ڂ����p���Ă��܂��B</textarea><br />�N�Q�c�C�[�g�̌����Ɏg�����F(�K�{)<br /><font size="-1">���X�y�[�X�ŋ�؂�ƕ������͂ł��܂��B�P��̑O�ɔ��p�Łu-�i�}�C�i�X�j�v������ƁA<br />�@���̒P����܂ރc�C�[�g���������ʂ��珜�O����܂��B</font><br /><input id="query' + num + '" type="text" style="width:600px" value="' + str_ex5 + '"/><br />��i�̎�ށF<br /><input type="radio" name="art_type' + num + '" value="image' + num + '" id="image_type' + num + '" style="margin-bottom:40px">�C���X�g�E�ʐ^�E�G��@�@<input type="radio" name="art_type' + num + '" value="movie' + num + '" id="movie_type' + num + '" style="margin-bottom:40px">����@�@<input type="radio" name="art_type' + num + '" value="writing' + num + '" id="writing_type' + num + '" style="margin-bottom:40px">����<br/>�񍐎҂̑����F<br /><input type="radio" name="owner_type' + num + '" value="owner" id="owner_type' + num + '" style="margin-bottom:40px">���쌠�Җ{�l�@�@<input type="radio" name="owner_type' + num + '" value="represent" id="represent_type' + num + '" style="margin-bottom:40px">���쌠�҂̐����ȑ㗝�l�@<br/><center><input id="save_new" type="submit" value="���̓��e�ŐV�K�쐬" />�@<input class="closure" type="submit" value="' + str_close + '" /></center><br /></dd>');
      //�L�������́E�Ǘ�
      eval("var report_input_id =  \"#report" + num + "_input\";");
      $(report_input_id).focus(function () {
        if ($(report_input_id).val() == str_ex1) {
          $(this).val("");
        }
        $(this).css({
          color: '#222'
        });
      });
      $(report_input_id).blur(function () {
        if ($(this).val() == '')
          $(this).css({
            color: '#999'
          }).val(str_ex1);
      });

      eval("var original_id =  \"#tweet_image_original" + num + "\";");
      $(original_id).focus(function () {
        if ($(original_id).val() == str_ex2) {
          $(this).val("");
        }
        $(this).css('color', '#222');
      });
      $(original_id).blur(function () {
        if ($(this).val() == '')
          $(this).css({
            color: '#999'
          }).val(str_ex2);
      });

      eval("var original_url_id =  \"#tweet_url_original" + num + "\";");
      $(original_url_id).focus(function () {
        if ($(original_url_id).val() == str_ex3) {
          $(this).val("");
        }
        $(this).css('color', '#222');
      });
      $(original_url_id).blur(function () {
        if ($(this).val() == '')
          $(this).css({
            color: '#999'
          }).val(str_ex3);
      });

      eval("var infringement_id =  \"#tweet_image_infringement" + num + "\";");
      $(infringement_id).focus(function () {
        if ($(infringement_id).val() == str_ex4) {
          $(this).val(str_ex4_after);
        }
        $(this).css('color', '#222');
      });
      $(infringement_id).blur(function () {
        if ($(this).val() == '')
          $(this).css({
            color: '#999'
          }).val(str_ex4);
      });

      eval("var query_id =  \"#query" + num + "\";");
      $(query_id).focus(function () {
        if ($(query_id).val() == str_ex5) {
          $(this).val("-RT");
        }
        $(this).css('color', '#222');
      });
      $(query_id).blur(function () {
        if ($(this).val() == '' || $(this).val() == "-RT")
          $(this).css({
            color: '#999'
          }).val(str_ex5);
      });

      var all_id = report_input_id + ", " + original_id + ", " + original_url_id + ", " + infringement_id + ", " + query_id;
      $(all_id).css('color', '#999');

      $(function () {
        var save = function () {
          chrome.storage.local.get(function (items) {
            for (let i = 0; i < items.repNum; i++) {
              const report = $('#report' + i + '_input').val();
              const owner_name = $('#owner_name' + i + '_input').val();
              const hide_pop = $('#hide_pop' + i).prop('checked');
              const hide_his = $('#hide_his' + i).prop('checked');
              const tweet_image_original = $('#tweet_image_original' + i).val();
              const tweet_url_original = $('#tweet_url_original' + i).val();
              const tweet_image_infringement = $('#tweet_image_infringement' + i).val();
              const query = $('#query' + i).val();
              const art_type = $('input[name=art_type' + i + ']:checked').val();
              const owner_type = $('input[name=owner_type' + i + ']:checked').val();

              if (report === "" || owner_name === "" || tweet_image_original === "" || tweet_url_original === "" || tweet_image_infringement === "" || query === "") {
                alert(str_al_save_new);
                break;
              }

              const rep = {
                ['report' + i]: report,
                ['owner_name' + i]: owner_name,
                ['hide_pop' + i]: hide_pop,
                ['hide_his' + i]: hide_his,
                ['tweet_image_original' + i]: tweet_image_original,
                ['tweet_url_original' + i]: tweet_url_original,
                ['tweet_image_infringement' + i]: tweet_image_infringement,
                ['query' + i]: query,
                ['art_type' + i]: art_type,
                ['owner_type' + i]: owner_type,
                slyr_mode: "pakutwi"
              };

              chrome.storage.local.set(rep, function (items) {});
            }

            if (report !== "" && owner_name !== "" && tweet_image_infringement !== "" && tweet_url_original !== "" && query !== "") {
              alert(str_saved);
              repCounter();
              location.reload();
            }
          });
        }
        chrome.storage.local.get(function (items) {
          for (i = 0; i < items.repNum; i++) {
            eval("$(\'#save" + i + "\').click(function(){save();});");
          }
        });
        $('#save_new').click(function () {
          chrome.storage.local.get(function (items) {
            var report = $('#report' + num + '_input').val();
            var owner_name = $('#owner_name' + num + '_input').val();
            var tweet_image_original = $('#tweet_image_original' + num).val();
            var tweet_image_infringement = $('#tweet_image_infringement' + num).val();
            var tweet_url_original = $('#tweet_url_original' + num).val();
            var query = $('#query' + num).val();
            var art_type = $('input[name=art_type' + i + ']:checked').val();
            var owner_type = $('input[name=owner_type' + i + ']:checked').val();

            var repNew = report;
            var ownNew = owner_name;
            var origNew = tweet_image_original;
            var urlNew = tweet_url_original;
            var infNew = tweet_image_infringement;
            var queryNew = query;
            var art_typeNew = art_type;
            var owner_typeNew = owner_type;

            if (repNew === str_ex1 || repNew === "" || ownNew === "" || origNew === str_ex2 || origNew === "" || urlNew === str_ex3 || infNew === str_ex4 || infNew === "" || queryNew === str_ex5 || queryNew === "" || art_typeNew === undefined || owner_typeNew === undefined) {
              alert(str_al_save_new);
            } else {
              var obj = {
                ['report' + num]: repNew,
                ['owner_name' + num]: ownNew,
                ['hide_pop' + num]: null,
                ['hide_his' + num]: null,
                ['tweet_image_original' + num]: origNew,
                ['tweet_image_infringement' + num]: infNew,
                ['tweet_url_original' + num]: urlNew,
                ['query' + num]: queryNew,
                ['art_type' + num]: art_typeNew,
                ['owner_type' + num]: owner_typeNew,
                ['urlArr' + num]: [],
                ['urlDateArr' + num]: [],
                ['urlFinArr' + num]: [],
                ['urlFinDateArr' + num]: [],
                ['accNameArr' + num]: [],
                ['accSusArr' + num]: [],
                ['accSusDateArr' + num]: [],
                mode: num
              };

              chrome.storage.local.set(obj, function (items) {});
              repCounter();
              showSetting();
              showReports();
              alert(str_saved);
              location.reload();
            }
          });
        });
        $("#acMenu dt, #hisMenu dt").on("click", function () {
          $(this).next('dd').slideToggle("fast");
          var contents = $(this).next('dd');
          $('dd').not(contents).slideUp("fast");
        });
        $('.hisBoxMenu dt, .finBoxMenu dt, .accBoxMenu dt, .susBoxMenu dt').unbind('click');
        $(".hisBoxMenu dt, .finBoxMenu dt, .accBoxMenu dt, .susBoxMenu dt").on("click", function () {
          $(this).next('dd').slideToggle("fast");
          var contents = $(this).next('dd');
          $('.hisBoxMenu dd, .finBoxMenu dd, .accBoxMenu dd, .susBoxMenu dd').not(contents).slideUp("fast");
        });
        $('.closure').unbind('click');
        $(".closure").on("click", function () {
          $(this).closest('dd').slideToggle("fast");
        });
      });
    });
    $('#main').append('<font size="-1"><br/><center><span>���N�Q�c�C�[�g�̌����E�񍐂�<strong>�E�B���h�E�E��̃A�C�R��<img src=\"images/ccslyrt_16.png\" width=\"24\"></strong>����s���܂��B<br/><br/>���񍐃��X�g�ւ�URL�ǉ��p�{�^���́A<strong>�e�c�C�[�g�̓��t�̉�</strong>�ɕ\������܂��B<br/>���܂��\������Ȃ��ꍇ�́ACtrl�L�[�������Ȃ��炻�̃y�[�W���X�V���Ă��������B<br/><br/>��Twitter���̎�Ⴂ�ŁA�I���W�i���̉摜�E���悪�폜����Ă��܂����ꍇ�̑Ώ��@��<a href=\"http://botslyr.nakashima723.info/fax-sample/\"><strong>������</strong></a><br/><br/></ br>developed by <a href=\"https://twitter.com/nakashima723\">nakashima723</a> since 2015</font><br/><font size=\"-2\">�s��E���v�]�Ȃǂ���܂�����A��L�A�J�E���g�܂��͈ȉ��̃A�h���X�܂ł��A�����������B</font><br/><a href=\"mailto:yokoshima723@gmail.com\">yokoshima723@gmail.com</a></span></center></font>');
  });
  //�����n�` for Google
  //��������`
  var m_str_ex1 = "��F�ǃh���Ώ��@",
    m_str_ex2 = "��1�F�������삵�A�ȉ���URL�Ō��J���������̃C���X�g�����f�œ]�ڂ��ꗘ�p����Ă��܂��B��������Җ{�l�ł��邱�Ƃ́ATwitter�A�J�E���g�̃v���t�B�[���ɁA���̕񍐂Ɏg�p���Ă��郁�[���A�h���X���L�ڂ���Ă��邱�Ƃ��炲�m�F���������܂��B\n��2�F���Ђ�2015�N�ɐ���E�̔�����PC�Q�[���u�������v�̃t�@�C�����L���\�ɂ����@��Torrent�t�@�C���̔z�z�A�܂��͖��f�œ]�ڂ��ꂽ�A�b�v���[�_�[�ւ̃����N���s���Ă��܂��B",
    m_str_ex3 = "��Fhttps://twitter.com/nakashima723/status/493780492345307136",
    m_str_ex4 = "��F�i�����̍�i���j zip OR rar OR torrent OR raw -site:nakashima723.info",
    m_str_setting = "��{�ݒ�",
    str_holder = "�����ɈϔC���̍�ҁE�����Җ������",
    m_str_setting_ex = "<font size=\"-1\">Google��<a href=\"https://www.google.com/webmasters/tools/dmca-notice\" target=\"report\"><strong>���쌠�N�Q�񍐃t�H�[��</strong></a>�ɓ��͂�����e��ݒ肵�܂��B<br/>�����Ȃǂ��ׂĂ̕񍐂ɋ��ʂ���u��{�ݒ�v�ƁA<br/>�N�Q�̓��e���ƂɈقȂ�u�񍐓��e�v���L�����Ă��������B</font>",
    m_str_company = "��F�A�z��";

  var m_save = function () {
    chrome.storage.local.get(function (items) {
      for (i = 0; i < items.m_repNum; i++) {
        var rep = new Object();
        var m_report = $('#m-report' + i + '_input').val();
        var m_hide_pop = $('#m-hide_pop' + i).prop('checked');
        var m_hide_his = $('#m-hide_his' + i).prop('checked');
        var m_infringement = $('#m-infringement' + i).val();
        var m_original = $('#m-original' + i).val();
        var m_query = $('#m-query' + i).val();
        var m_holder = $('#m-holder' + i).val();
        if (m_report == "" || m_original == "" || m_infringement == "" || m_query == "" || m_holder == "" || m_holder == str_holder) {
          alert(str_al_save_new);
          break;
        }
        rep['m_report' + i] = m_report;
        rep['m_hide_pop' + i] = m_hide_pop;
        rep['m_hide_his' + i] = m_hide_his;
        rep['m_original' + i] = m_original;
        rep['m_infringement' + i] = m_infringement;
        rep['m_holder' + i] = m_holder;
        rep['m_query' + i] = m_query;
        rep['slyr_mode'] = 'murahachi';
        rep['m_bar'] = 'on';
        chrome.storage.local.set(rep, function (items) {});
      }
      if (m_report !== "" && m_infringement !== "" && m_original !== "" && m_query !== "" && m_holder !== "" && m_holder !== str_holder) {
        alert(str_saved);
        repCounter();
        location.reload();
      }
    });
  }

  //���̓t�H�[���𐶐�
  chrome.storage.local.get(function (items) {
    var num = items.m_repNum;
    if (!items.m_repNum) {
      var num = 0;
    }
    //�o�^���݂̒���Җ�����v���_�E�����j���[�𐶐�
    const holderArr = [];
    for (let i = 0; i < num; i++) {
      const holderTemp = items[`m_holder${i}`];
      if (holderTemp !== "self") holderArr.push(holderTemp);
    }

    const uniqueHolderArr = Array.from(new Set(holderArr));
    uniqueHolderArr.sort();
    let holderMenu = "<option value=\"0\">�o�^���݂̌����Җ��������</option>";
    for (let i = 0; i < uniqueHolderArr.length; i++) {
      const holderOption = uniqueHolderArr[i];
      const holderLine = `<option value="${holderOption}">${holderOption}</option>`;
      holderMenu += holderLine;
    }

    $('#m-setting_div').append("<dl id=\"m-acMenu\" style =\'margin:0 auto; width: 100%;\'><h2>" + m_str_setting + "</h2>" + m_str_setting_ex + "<br/><br/><dt><button id=\"m-setting\">" + str_edit + "</button><br /></dt><dd style =\'margin:0 30px auto; display:none; width:\"100%;\"'>�{�v���O�����͕񍐑ΏۂƂȂ钘�앨�̐����Ȍ����҂̕��A�܂��͂��̑㗝�l�݂̂����p���������܂��B���앨�̒�`��A�����g�̌����̗L���ɂ��Ă͊e���ł��m�F���������B<br /><br /><strong>�A����</strong><br />�{���i���j:<br /><input id=\"m-family\" type=\"text\" value=\"" + str_yamada + "\"/><br />�{���i���j:<br /><input id=\"m-name\" type=\"text\" value=\"" + str_taro + "\" /><br />��Ж��i�C�Ӂj:<br /><input id=\"m-company\" type=\"text\" value=\"" + m_str_company + "\" /><br />���[�� �A�h���X : <input id=\"m-email\" type=\"text\" /><br /><strong>�@�I�Ȑ鐾�F</strong><br /><font size=\"2.8em\"><br /><input id=\"m-statement1\" type=\"checkbox\">���́A�񍐑ΏۂƂȂ�URL��̒��앨�����쌠�̏��L�ҁA�㗝�l�A�܂��͖@���ɂ�鋖�Ȃ��g�p����Ă��邱�Ƃ𐽎��Ɋm�M���������ŁA���̃c�[�����g�p���܂��B<br /><br /><input id=\"m-statement2\" type=\"checkbox\">���̃c�[�����œ��͂��Ă�����ɋU��͂���܂���B���́A�U�؂������̑Ώۂł��邱�Ƃ����m�̂����ŁA�Ɛ�I������N�Q���ꂽ���앨�̒��쌠���L�҂܂��͂��̐����ȑ㗝�l�ł��邱�Ƃ𐾂��܂��B<br /><br /><input id=\"m-statement3\" type=\"checkbox\">�@�I�Ȓʒm�͂��ׂĂ��̎ʂ��� Lumen �v���W�F�N�g�ihttp://lumendatabase.org�j�ɑ��t����A���J���ꂽ�蒍�߂�t����ꂽ�肷��ꍇ�����邱�Ƃ𗝉����Ă��܂��B�܂��A�l�̘A������� Lumen �ɂ���Č��J�O�ɒʒm����폜�������̂́A�����̏ꍇ�A�l���͍폜����Ȃ����Ƃ��������Ă��܂��B<br /><br /></font><br /><input id=\"m_save_setting\" type=\"submit\" value=\"���̓��͓��e��ۑ�\" />�@<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /><br /></dd> <h2>" + str_edit_report + "</h2><dt><button id=\"m-new_report\">�V�����񍐓��e���쐬</button></dt> <dd id = \"m-form" + num + "\"><strong>�V�����񍐓��e�̖��O</strong><br /><font size =\"-1\">�����̕񍐓��e�Ƌ�ʂł���悤�ɁA�킩��₷�����O�����Ă��������B</font><input id=\"m-report" + num + "_input\" type=\"text\" value=\"" + m_str_ex1 + "\"/><br /><strong>�I���W�i����i�̓��e�ƁA���쌠�N�Q�̓��e�F</strong></br><font size=\"-1\">��Google�̍폜�S���҂��A�폜�ΏۂƂȂ�y�[�W�ɂ��̍�i���o�����邩�ǂ������m�F����̂�</br>�@�g���܂��B<strong>�P�̕񍐓��e�ň����̂͂P��ނ̍�i�i���i�j�̂�</strong>�Ƃ��A�킩��₷���L�q����</br>�@���������B</font><textarea id=\"m-original" + num + "\" style=\"height:140px;\" \">" + m_str_ex2 + "</textarea><br /><strong>�񍐎҂̑����F</strong></br><input type=\"radio\" name=\"reporter-type\" value=\"author\" id=\"author-type\" style=\"margin-bottom:15px\"> ��ҁA�܂��͌�����<strong>�{�l</strong></br><input type=\"radio\" name=\"reporter-type\" value=\"attoney\" id=\"attoney-type\" style=\"margin-bottom:20px\"> ��҂܂��͌����҂́A������<strong>�㗝�l</strong> <input id=\"m-holder" + num + "\" style=\"margin-bottom:10px\" name=\"holder\" type=\"text\" value=\"\"/><form><select id=\"holder-menu" + num + "\">" + holderMenu + "</select></form><p id=\"g-input" + num + "\"><font size =\"-1\">���V�K�Ɍ����Җ���o�^����ꍇ�AGoogle���̕񍐃t�H�[���ł�<strong>����񍐎��̂ݎ����</strong>���K�v�ł��B</br>�@�����ɋL���������̂�<strong>���������Җ�</strong>���AGoogle���̕񍐃t�H�[���ɂ��o�^���Ă��������B</font></p id=\"g-input" + num + "\"><strong>�I���W�i���̍�i���m�F�ł���URL�F</strong></br><font size=\"-1\">���폜�ΏۂƂȂ�URL�ł͂Ȃ��A��i�̔̔��y�[�W�⎩�g�ŃA�b�v���[�h�����T�C�g�ȂǁA</br><strong>�@���쌠��N�Q���Ă��Ȃ��y�[�W��URL</strong>���L�����Ă��������B�i1�s��1���j</font><textarea id=\"m-infringement" + num + "\">" + m_str_ex3 + "</textarea><br /><strong>�N�Q�T�C�g�̌����Ɏg�����F</strong></br><font size=\"-1\">���K�v�ɉ�����<a href=\"https://support.google.com/websearch/answer/2466433\" target=\"_blank\"><strong>�������Z�q</a></strong>���g�p����ƁA�T�C�g�̍i���݂����₷���Ȃ�܂��B</font><input id=\"m-query" + num + "\" type=\"text\" style=\"width:600px\" value=\"" + m_str_ex4 + "\"/><br /><center><input id=\"m-save_new\" type=\"submit\" value=\"���̓��e�ŐV�K�쐬\" />�@<input class=\"closure\" type=\"submit\" value=\"" + str_close + "\" /></center><br /></dd>");
    $('#m-holder' + num).hide();
    $('#g-input' + num).hide();
    $('#holder-menu' + num).hide();
    $('#author-type').click(function () {
      $('#m-holder' + num).val('self');
      $('#holder-menu' + num).hide();
      $('#m-holder' + num).hide();
      $('#g-input' + num).hide();
    });
    $('#attoney-type').click(function () {
      $('#m-holder' + num).css({
        color: '#999'
      }).val(str_holder);
      $('#m-holder' + num).show();
      $('#holder-menu' + num).show();
      $('#g-input' + num).show();
    });
    $('#holder-menu' + num).change(function () {
      var val = $('#holder-menu' + num).val();
      $('#m-holder' + num).css({
        color: '#222'
      }).val(val);
      $('#holder-menu' + num).val(0);
    });

    if (items.m_repNum > 0) {
      $('#m-acMenu h2:eq(1)').after("<font size=\"-1\">�N�Q�̓��e���ƂɁA�^�C�g���⌳��i��URL��ݒ肵�Ă��������B</br></font>");
      for (var i = 0; i < items.m_repNum; i++) {
        var m_thisTitle = (i + 1) + ': ' + items['m_report' + i];
        var m_hide_his = items['m_hide_his' + i];
        var $newButton = $('<button>').attr('id', 'm_report' + i).text(m_thisTitle);
        var $newDt = $('<dt>').append($newButton);
        $('#m-new_report').closest('dt').before($newDt);
        $('#m_report' + i).text(m_thisTitle);
        $('#m-new_report').closest('dt').before(`<dd id="m-form${i}">
  <strong>���̕񍐓��e�̖��O</strong><br />
  <font size="-1">�����̕񍐓��e�Ƌ�ʂł���悤�ɁA�킩��₷�����O�����Ă��������B</font>
  <input id="m-report${i}_input" type="text" style="margin-bottom:10px" />
  <input type="checkbox" id="m-hide_pop${i}" style="margin-bottom:30px">�����p�|�b�v�A�b�v�̈ꗗ�ɕ\�����Ȃ�
  <input type="checkbox" id="m-hide_his${i}" style="margin-bottom:30px">�񍐗����ꗗ�ɕ\�����Ȃ�<br />
  <strong>�I���W�i����i�̓��e�ƁA���쌠�N�Q�̓��e�F</strong><br />
  <font size="-1">��Google�̍폜�S���҂��A�폜�ΏۂƂȂ�y�[�W�ɂ��̍�i���o�����邩�ǂ������m�F����̂Ɏg���܂��B<strong>�P�̕񍐓��e�ň����̂͂P��ނ̍�i�i���i�j�̂�</strong>�Ƃ��A�킩��₷���L�q���Ă��������B</font><textarea style="height:140px;" id="m-original${i}"></textarea><br /><strong>�񍐎҂̑����F</strong></br><input type="radio" name="reporter-type${i}" value="author" id="author-type${i}" style="margin-bottom:15px">��ҁA�܂��͌�����<strong>�{�l</strong></br><input type="radio" name="reporter-type${i}" value="attoney" id="attoney-type${i}" style="margin-bottom:15px">��҂܂��͌����҂́A������<strong>�㗝�l</strong> <input name="holder" style="margin-bottom:10px" id="m-holder${i}" type="text" value=""/><form><select id="holder-menu${i}">${holderMenu}</select></form><p id="g-input${i}"><font size ="-1">���V�K�Ɍ����Җ���o�^����ꍇ�AGoogle���̕񍐃t�H�[���ł�<strong>����񍐎��̂ݎ����</strong>���K�v�ł��B</br>�@�����ɋL���������̂�<strong>���������Җ�</strong>���AGoogle���̕񍐃t�H�[���ɂ��o�^���Ă��������B</font></p><strong>�I���W�i���̍�i���m�F�ł���URL�F</strong></br><font size=" -1">���폜�ΏۂƂȂ�URL�ł͂Ȃ��A��i�̔̔��y�[�W�⎩�g�ŃA�b�v���[�h�����T�C�g�ȂǁA</br><strong>�@���쌠��N�Q���Ă��Ȃ��y�[�W��URL</strong>���L�����Ă��������B�i1�s��1���j</font><textarea id="m-infringement${i}"></textarea><br /><strong>�N�Q�T�C�g�̌����Ɏg�����F</strong></br><font size=" -1">���K�v�ɉ�����<a href="https://support.google.com/websearch/answer/2466433" target="_blank"><strong>�������Z�q</a></strong>���g�p����ƁA�T�C�g�̍i���݂����₷���Ȃ�܂��B</font><input id="m-query${i}" type="text" style="width:600px"/><br /><center><input id="m-save${i}" type="submit" value="���̓��͓��e��ۑ�" />�@<input class="closure" type="submit" value='${str_close}' /><br /><button id ="m-del_report${i}" style="font-size:0.9em; background-color:#666; color:#fff;">���̍��ڂ��폜</button></center><br /><br />
</dd>`);
        $('#m-del_report' + i).hide();

        if (items['m_holder' + i] === 'self' || items['m_holder' + i] === undefined) {
          $('#m-holder' + i).hide();
          $('#holder-menu' + i).hide();
          $('#g-input' + i).hide();
        }

        $('#author-type' + i).click(function () {
          $('#m-holder' + i).val('self');
          $('#m-holder' + i).hide();
          $('#holder-menu' + i).hide();
          $('#g-input' + i).hide();
        });

        $('#attoney-type' + i).click(function () {
          $('#m-holder' + i).val(str_holder);
          $('#m-holder' + i).css({
            color: '#999'
          });
          $('#m-holder' + i).show();
          $('#holder-menu' + i).show();
          $('#g-input' + i).show();
        });

        $('#holder-menu' + i).change(function () {
          var val = $('#holder-menu' + i).val();
          $('#m-holder' + i).css({
            color: '#222'
          }).val(val);
          $('#holder-menu' + i).val(0);
        });

      }
      //�񍐗����ꗗ�𐶐�
      $('#m-hisMenu').append('<h2>�񍐗����̊m�F�ƊǗ�</h2><font size="-1">�񍐌�̌��ʂ́A<a href ="https://www.google.com/webmasters/tools/dmca-dashboard" target="m_dashboard"><strong>Google�̍폜�p�_�b�V���{�[�h</strong></a>����m�F�ł��܂��B</font></br></br>');
      for (var i = 0; i < items.m_repNum; i++) {
        var thisArr = items['m_Arr' + i];
        var thisDateArr = items['m_DateArr' + i];
        var thisSiteArr = items['m_SiteArr' + i];
        var thisFinArr = items['m_FinArr' + i];
        var thisFinDateArr = items['m_FinDateArr' + i];
        var thisFinSiteArr = items['m_FinSiteArr' + i];
        var thisTitle = (i + 1) + ': ' + items['m_report' + i];
        var hide_his = items['m_hide_his' + i];
        var urlNum = thisArr.length;
        var urlFinNum = thisFinArr.length;

        //�h���C���ʈꗗ�𐶐�
        var DomArr = [],
          DomUniArr = [],
          domUniNum = DomUniArr.length;
        //�d���̂Ȃ��ꗗ�𐶐�

        //	var DomeUniArr= thisDomeArr.filter(function (a, b, self) { return self.indexOf(a) === b; });
        //	var finDomeUniArr= thisFinDomeArr.filter(function (a, b, self) { return self.indexOf(a) === b; });	
        //	var accUniNum = accUniArr" + i + ".length;
        //�\����ON�ɂȂ��Ă��邩����
        if (hide_his !== true) {
          // dt�v�f�̒ǉ�
          var $newDt = $('<dt>');
          $newDt.append($('<button>').attr('id', 'm-history' + i).text('���̖��ݒ�'));
          $newDt.append('<br/>');
          $newDt.append($('<span>').attr('id', 'm-reported' + i).html('<font size="-1">�@���񍐁F ' + urlNum + '���@ �񍐂��݁F ' + urlFinNum + '���@</font><br /><br/>'));
          $('#m-hisMenu').append($newDt);

          // dd�v�f�̒ǉ�
          var $newDd = $('<dd>').attr('id', 'm-hisBox' + i);

          // m-urlBoxMenu�̒ǉ�
          var $newDl1 = $('<dl>').addClass('m-hisBoxMenu').css('margin', '0 auto');
          $newDl1.append($('<dt>').append($('<button>').attr('id', 'm-urlHis' + i).text('����URL�ꗗ (' + urlNum + '��)')));
          $newDl1.append($('<dd>').attr('id', 'm-urlBox' + i).append($('<div>').attr('id', 'm-urlTable' + i)));
          $newDd.append($newDl1);

          // m-finBoxMenu�̒ǉ�
          var $newDl2 = $('<dl>').addClass('m-finBoxMenu').css('margin', '0 auto');
          $newDl2.append($('<dt>').append($('<button>').attr('id', 'm-finHis' + i).text('�񍐂���URL�ꗗ (' + urlFinNum + '��)')));
          $newDl2.append($('<dd>').attr('id', 'm-finBox' + i).append($('<div>').attr('id', 'm-finTable' + i)));
          $newDd.append($newDl2);

          // m-domBoxMenu�̒ǉ�
          var $newDl3 = $('<dl>').addClass('m-domBoxMenu').css('margin', '0 auto');
          $newDl3.append($('<dt>').append($('<button>').attr('id', 'm-domHis' + i).text('�T�C�g�ʈꗗ (�J����)')));
          $newDl3.append($('<dd>').attr('id', 'm-domBox' + i).append($('<div>').attr('id', 'm-domTable' + i).text('������Web����@�\�́A�T�[�o�[�ւ̕��S����J����������܂����B\n\n')));
          $newDd.append($newDl3);

          $('#m-hisMenu').append($newDd);

          // �{�^���̃^�C�g�����X�V
          $('#m-history' + i).text(thisTitle);

          // m-urlHis�̃X�^�C����ݒ�
          $('#m-urlHis' + i).css({
            color: '#FFF',
            backgroundColor: '#888'
          });

          // m-finHis�̃X�^�C����ݒ�
          $('#m-finHis' + i).css({
            color: '#F4F4F4',
            backgroundColor: '#666'
          });

          // m-domHis�̃X�^�C����ݒ�
          $('#m-domHis' + i).css({
            color: '#F6F6F6',
            backgroundColor: '#444'
          });

          // 0���̂Ƃ���URL�ꗗ�{�^�����\��
          if (urlNum == 0) {
            $('#m-urlHis' + i).hide();
          }

          if (urlFinNum == 0) {
            $('#m-finHis' + i).hide();
            $('#m-domHis' + i).hide();
          }

          for (var j = 0; j < urlNum; j++) {
            var urlThis = thisArr[j];
            var siteThis = thisSiteArr[j];
            var dateThis = thisDateArr[j];
            var lineThis = siteThis + '�@' + urlThis;

            var $newTable = $('<table>').attr('width', '100%');
            var $newTr = $('<tr>');
            var $newTd = $('<td>').attr('width', '85%').css('margin', '0 auto');
            $newTd.append($('<font>').attr('size', '2.5').append($('<span>').attr('id', 'm-urlNum' + i + '_' + j).text((j + 1) + ': ')));
            $newTd.append($('<a>').attr('href', urlThis).attr('target', '_blank').append($('<font>').attr('size', '2.5').append($('<span>').attr('id', 'm-urlLine' + i + '_' + j).text(lineThis))));
            $newTd.append($('<br>'));
            $newTd.append($('<font>').attr('size', '1.8').append($('<span>').addClass('alignright').attr('id', 'm-urlDateLine' + i + '_' + j).text(dateThis)));
            $newTd.append($('<br>'));
            $newTd.append($('<br>'));
            $newTr.append($newTd);
            $newTable.append($newTr);

            $('#m-urlTable' + i).prepend($newTable);
          } //URL�̈ꗗ��ǉ��̏I���

          //�񍐂���URL�̈ꗗ��ǉ�
          for (var j = 0; j < urlFinNum; j++) {
            var finThis = thisFinArr[j];
            var siteThis = thisFinSiteArr[j];
            var finDateThis = thisFinDateArr[j];
            var m_finRep = [];

            for (var l = 0; l < thisFinArr.length; l++) {
              if (items.m_FinSiteArr[i][j] === thisSiteArr[i][l]) {
                m_finRep.push(finThis);
              }
            }

            var $newTable = $('<table>').attr('width', '100%');
            var $newTr = $('<tr>');
            var $newTd = $('<td>').attr('width', '85%').css('margin', '0 auto');
            $newTd.append($('<font>').attr('size', '2.5').append($('<span>').attr('id', 'm-urlFinNum' + i + '_' + j).text((j + 1) + ': ')));
            $newTd.append($('<a>').attr('href', finThis).attr('target', '_blank').append($('<font>').attr('size', '2.5').append($('<span>').attr('id', 'm-urlFinLine' + i + '_' + j).text(finThis))));
            $newTd.append($('<br>'));
            $newTd.append($('<font>').attr('size', '1.8').append($('<span>').addClass('alignright').attr('id', 'm-finNumLine' + i + '_' + j).append(finDateThis + '�@by ').append($('<strong>').append($('<a>').attr('href', finThis).attr('target', '_blank').text(siteThis)))));
            $newTd.append($('<br>'));
            $newTd.append($('<br>'));
            $newTr.append($newTd);
            $newTable.append($newTr);

            $('#m-finTable' + i).prepend($newTable);
          }
          //�񍐂���URL�̈ꗗ��ǉ��̏I���
          //�X�N���[���o�[�̃f�U�C��
          // Create object for custom scrollbar settings
          var csObj = new Object();
          csObj.theme = "dark";

          // Set custom scrollbar to URL and Finished URL tables
          $("#m-urlTable" + i).mCustomScrollbar(csObj);
          $("#m-finTable" + i).mCustomScrollbar(csObj);

          // Add clear button to URL box
          var clearButtonHtml = '<center><input id="clear_m_Arr' + i + '" type="submit" value="' + str_url_clear + '" style="background-color:#999; color:#fff;"/><br/><br/></font></center>';
          $("#m-urlBox" + i).append(clearButtonHtml);
          var copyButtonHtml = '<center><input id="copy_m_Arr' + i + '" type="submit" value="' + str_url_copy + '" style="background-color:#111; color:#fff;"/><br/><br/></font></center>';
          $("#m-urlBox" + i).append(copyButtonHtml);

          // Add click event listener to clear button

          $("#copy_m_Arr" + i).click(function () {
            var mode = $(this).attr("id").replace("copy_m_Arr", "");
            var Arr = items['m_Arr' + mode];
            ArrString = "";
            for (var i = 0; i < Arr.length; i++) {
              ArrString = ArrString + Arr[i] + "\n";
            }
            const textToCopy = ArrString;
            navigator.clipboard.writeText(textToCopy)
              .then(() => {
                console.log(`Copied "${textToCopy}" to clipboard successfully.`);
              })
              .catch((error) => {
                console.error(`Failed to copy "${textToCopy}" to clipboard: ${error}`);
              });
            alert("URL�ꗗ���N���b�v�{�[�h�ɃR�s�[���܂����B");
          });
          $("#clear_m_Arr" + i).click(function () {
            if (window.confirm("���̍��ڂ̖���URL�����ׂč폜���܂����H")) {
              // Create object for storage keys to be deleted
              var del = {};
              var mode = $(this).attr("id").replace("clear_m_Arr", "");
              del["m_Arr" + mode] = [];
              del["m_DateArr" + mode] = [];
              del["m_SiteArr" + mode] = [];

              // Delete storage keys and reload page
              chrome.storage.local.set(del, function () {
                location.reload();
              });

              alert("���̍��ڂ̖���URL�����ׂč폜���܂����B");
            } else {}
          });
        } //�\����ON�ɂȂ��Ă��邩����̏I���			
      } //�񍐗����ꗗ�����̏I���
    }

    //��{�ݒ�̕ۑ��E�X�V�{�^���ɃN���b�N�C�x���g��ݒ�
    $('#m_save_setting').click(function () {
      var m_name = $('#m-name').val();
      var m_family = $('#m-family').val();
      var m_company = $('#m-company').val();
      var m_email = $('#m-email').val();
      var m_statement1 = $('#m-statement1').prop('checked');
      var m_statement2 = $('#m-statement2').prop('checked');
      var m_statement3 = $('#m-statement3').prop('checked');
      //console.log(account_name);
      if (m_name == "" || m_name == str_taro || m_family == "" || m_family == str_yamada || m_company == m_str_company || m_email == "" || m_statement1 !== true || m_statement2 !== true || m_statement3 !== true) {
        alert(str_al_save_new);
      } else {
        var obj = new Object();
        obj['m_name'] = m_name;
        obj['m_family'] = m_family;
        obj['m_company'] = m_company;
        obj['m_email'] = m_email;
        obj['slyr_mode'] = "murahachi";
        chrome.storage.local.set(obj, function () {});
        location.reload();
        alert(str_saved);
      }
    });
    //�񍐓��e�̕ۑ��E�X�V�{�^���ɃN���b�N�C�x���g��ݒ�
    for (i = 0; i < items.m_repNum; i++) {
      $('#m-save' + i).click(m_save);
    }
    $('#m-save_new').click(function () {
      chrome.storage.local.get(function (items) {
        const m_report_input_id = "#m-report" + num + "_input";
        const m_original_id = "#m-original" + num;
        const m_infringement_id = "#m-infringement" + num;
        const m_query_id = "#m-query" + num;

        const m_report = $(m_report_input_id).val();
        const m_infringement = $(m_infringement_id).val();
        const m_original = $(m_original_id).val();
        const m_query = $(m_query_id).val();
        const m_holder = $("#m-holder" + num).val();

        //���������͂���Ă��邩����
        const m_repNew = m_report;
        const m_origNew = m_original;
        const m_infNew = m_infringement;
        const m_queryNew = m_query;
        const m_holdNew = m_holder;

        //URL����URL���L������Ă��邩�ǂ�������
        var urls = m_infNew.split("\n");
        for (i = 0; i < urls.length; i++) {
          if (urls[i].indexOf('http://') == -1 && urls[i].indexOf('https://') == -1) {
            var notURL = true;
          }
          if (urls[i].indexOf(' ') !== -1 || urls[i].indexOf('�@') !== -1) {
            var notURL = true;
          }
        }
        //���͓��e�ɕs�����Ȃ�������
        if (m_repNew === m_str_ex1 || m_repNew === "" || m_origNew === m_str_ex2 || m_origNew === "" || m_infNew === m_str_ex3 || m_infNew === "" || m_queryNew === m_str_ex4 || m_queryNew === "" || m_holdNew === "" || m_holdNew === str_holder || m_holdNew === null || m_holdNew === undefined || notURL === true) {
          alert(str_al_save_new);
          if (notURL === true) {
            alert("�u�I���W�i����i��URL�v��1�s��1���A�uhttp://�v�܂��́uhttps://�v����͂��܂�URL�݂̂���͂��Ă��������B");
          }
        } else {
          var obj = new Object();
          obj['m_report' + num] = m_repNew;
          obj['m_hide_pop' + num] = null;
          obj['m_hide_his' + num] = null;
          obj['m_original' + num] = m_origNew;
          obj['m_infringement' + num] = m_infNew;
          obj['m_holder' + num] = m_holdNew;
          obj['m_query' + num] = m_queryNew;
          obj['m_Arr' + num] = [];
          obj['m_SiteArr' + num] = [];
          obj['m_DateArr' + num] = [];
          obj['m_FinArr' + num] = [];
          obj['m_FinSiteArr' + num] = [];
          obj['m_FinDateArr' + num] = [];
          obj['m_mode'] = num;
          obj['slyr_mode'] = "murahachi";
          obj['m_bar'] = "on";
          chrome.storage.local.set(obj, function (items) {});
          repCounter();
          showSetting();
          showReports();
          alert(str_saved);
          location.reload();
        }

      });
    });
    //�L����̕\��/��\�����Ǘ�
    $('#m-name').focus(function () {
      if ($('#m-name').val() == str_taro) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $('#m-name').blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(str_taro);
    });
    $('#m-family').focus(function () {
      if ($('#m-family').val() == str_yamada) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $('#m-family').blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(str_yamada);
    });
    $('[name=holder]').focus(function () {
      if ($(this).val() === str_holder) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $('[name=holder]').blur(function () {
      if ($(this).val() === '')
        $(this).css({
          color: '#999'
        }).val(str_holder);
    });
    $('#m-company').focus(function () {
      if ($('#m-company').val() == m_str_company) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    //	    $('#m-company').blur(function(){
    //			if ($(this).val() == '')
    //			$(this).css({color:'#999'}).val(str_company);
    //			});
    var m_report_input_id = "#m-report" + num + "_input";
    var m_original_id = "#m-original" + num;
    var m_infringement_id = "#m-infringement" + num;
    var m_query_id = "#m-query" + num;
    var m_id_all = m_report_input_id + ", " + m_original_id + ", " + m_infringement_id + ", " + m_query_id;
    $(m_id_all).css('color', '#999');
    $(m_report_input_id).focus(function () {
      if ($(m_report_input_id).val() == m_str_ex1) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $(m_report_input_id).blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(m_str_ex1);
    });
    $(m_original_id).focus(function () {
      if ($(m_original_id).val() == m_str_ex2) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $(m_original_id).blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(m_str_ex2);
    });
    $(m_infringement_id).focus(function () {
      if ($(m_infringement_id).val() == m_str_ex3) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $(m_infringement_id).blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(m_str_ex3);
    });
    $(m_query_id).focus(function () {
      if ($(m_query_id).val() == m_str_ex4) {
        $(this).val("");
      }
      $(this).css('color', '#222');
    });
    $(m_query_id).blur(function () {
      if ($(this).val() == '')
        $(this).css({
          color: '#999'
        }).val(m_str_ex4);
    });

    //�g�O����ݒ�
    $("#m-acMenu dt, #m-hisMenu dt").on("click", function () {
      $(this).next('dd').slideToggle("fast");
      var contents = $(this).next('dd');
      $('dd').not(contents).slideUp("fast");
    });
    $('.m-hisBoxMenu dt, .m-finBoxMenu dt, .m-domBoxMenu dt').unbind('click');
    $(".m-hisBoxMenu dt, .m-finBoxMenu dt, .m-domBoxMenu dt").on("click", function () {
      $(this).next('dd').slideToggle("fast");
      var contents = $(this).next('dd');
      $('.m-hisBoxMenu dd, .m-finBoxMenu dd, .m-domBoxMenu dd').not(contents).slideUp("fast");
    });
    $('.closure').unbind('click');
    $(".closure").on("click", function () {
      $(this).closest('dd').slideToggle("fast");
    });

    $('#m-main').append('<font size="-1"><br/><center><span>���N�Q�T�C�g�̌����E�񍐂�<strong>�E�B���h�E�E��̃A�C�R��<img src=\"images/ccslyrt_16.png\" width=\"24\"></strong>����s���܂��B<br/><br/>���񍐃��X�g�ւ�URL�ǉ��p�{�^���́A�u��{�ݒ�v�Ɓu�񍐓��e�v�L�����</br><strong>�e�y�[�W�̍ŏ㕔</strong>�ɕ\������܂��B<br/>�܂��̓c�[���A�C�R������Google�������s���Ă݂Ă��������B<br/></br><font size=\"3\"><strong>���쌠�N�Q�ɂ�����Ȃ����ʕ񂵂Ȃ��悤�\�������ӂ��������B</strong></font></br>���Ƃ��΁ATwitter�EFacebook�EPixiv�Ȃ�</br>SNS�̌����E�B�W�F�b�g���g�p������i�̓]�ځi���ߍ��݁j��</br>���p�K��ɂ���ĔF�߂��Ă���A���@�Ȉ��p�̗v���𖞂����Ȃ��Ă�</br>���쌠�N�Q�Ƃ͂Ȃ�܂���B</br></br>developed by <a href=\"https://twitter.com/nakashima723\">nakashima723</a> since 2015</font><br/><font size=\"-2\">�s��E���v�]�Ȃǂ���܂�����A��L�A�J�E���g�܂��͈ȉ��̃A�h���X�܂ł��A�����������B</font><br/><a href=\"mailto:yokoshima723@gmail.com\">yokoshima723@gmail.com</a></span></center></font>');

  }); //chromestorage�̏I���
} //showSlyr�̏I���
showSlyr();
//
$(function () {
  $("#tabMenu li a").on("click", function () {
    $("#tabBoxes div").hide();
    $($(this).attr("href")).fadeToggle();
    $($(this).attr("href")).empty();
    showSlyr();
  });
  return false;
});

//�����n�`�d�_�̂Ƃ��A�����n�`�̉�ʂ�\��
chrome.storage.local.get(function (items) {
  if (items.slyr_mode === "murahachi") {
    $('#tabMenu li a').eq(1).trigger("click");
  }
});
$(function () {
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace == "local") {
      location.reload();
    }
  });
});

var obj = {};
