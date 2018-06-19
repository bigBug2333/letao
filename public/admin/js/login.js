/**
 * Created by HUCC on 2017/11/21.
 */
$(function() {
  //表单校验的功能
  //bootstrapValiador插件
  // 1.依赖bootstrap
  // 2.会自动进行表单的校验
  // 3.在表单提交的时候以及输入内容的时候会自己进行校验
  // 3.1如果失败了会组织你的表单提交
  // 3.2如果成功了会允许你的表单继续提交

  $("form").bootstrapValidator({
    // 1.初始化表单，调用bootstrapValidator
    // 配置校验规则，用户名不能为空，密码不能为空
    // 长度：密码6-12位

    // 配置校验的字段
    fields: {
      username: {
        //配置用户名的具体的校验规则
        validators: {
          // 不能为空
          notEmpty: {
            message: "用户名不能为空"
          },
          // 长度
          stringLength: {
            message: "用户名长度是3-9位",
            min: 3,
            max: 9
          },
          // 返回
          callback: {
            message: "用户名不正确"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "用户密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "用户密码长度是6-12位"
          },
          callback: {
            message: "用户密码不正确"
          }
        }
      }
    },

    //配置小图标
    feedbackIcons: {
      valid: "glyphicon glyphicon-thumbs-up",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    }
  });

  //2. 当表单校验成功的时候，阻止表单的跳转，使用ajax进行数据的提交
  //成功的时候触发
  $("form").on("success.form.bv", function(e) {
    e.preventDefault();

    //发送ajax请求
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("form").serialize(),
      success: function(info) {
        if (info.success) {
          //跳转到首页
          location.href = "index.html";
        }

        if (info.error === 1000) {
          //手动让username校验失败
          //参数1： 更新哪个字段
          //参数2： 更新为什么状态  INVALID  VALID
          $("form")
            .data("bootstrapValidator")
            .updateStatus("username", "INVALID", "callback");
        }

        if (info.error === 1001) {
          $("form")
            .data("bootstrapValidator")
            .updateStatus("password", "INVALID", "callback");
        }
      }
    });
  });

  //3. 重置表单的样式
  $("[type='reset']").on("click", function() {
    //获取到表单校验插件的实例，通过这个实例就可以调用插件提供的很多方法
    //resetForm(true): 重置表单所有的样式以及内容
    $("form")
      .data("bootstrapValidator")
      .resetForm(true);
  });
});
