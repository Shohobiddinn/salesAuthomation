<template>
  <RoundedWhiteContainer>
    <back-btn :link="link"></back-btn>
    <div class="grid grid-cols-2 gap-4 mt-4">
      <div>
        <div class="flex-row">
          <span class="fs-14 fw-4 text-gray-3">
            Название
          </span>
        </div>
        <div class="flex-row mt-2">
          <d-input placeholder="Введите"
                   class="w-full"
                   type="text"
                  />
        </div>
      </div>
      <div>
        <div class="flex-row">
          <span class="text-gray-3 fs-14 fw-4">
           Категории продукта *
          </span>
        </div>
        <div class="flex-row mt-2">
          <select class="border w-full h-[42px] bg-[#FAFDFD] rounded-lg mt-[1px] mr-[18px] pl-[15px]">
            <option value="">Выбрать</option>
            <option value="">hello</option>
            <option value="">hello</option>
            <option value="">hello</option>
          </select>
        </div>
      </div>
    </div>
    <div>
<!--      <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"></quill-editor>-->
      <div class="editor-container">
       <div class="options" >
         <button @click="boldFn()" ref="bold" class="option-button format">B</button>
         <button id="italic" class="option-button format">I</button>
         <button id="underline" class="option-button format">U</button>
         <button id="strikethrough" class="option-button format">$</button>
         <button id="superscript" class="option-button format">1X</button>
         <button id="subscript" class="option-button format">X1</button>
         <!-- list -->
         <button id="insertOrderedList" class="option-button format">12__</button>
         <button id="insertUnOrderedList" class="option-button format">..--</button>
         <!-- undo/rado -->
         <button id="undo" class="option-button format">1@</button>
         <button id="redo" class="option-button format">2@</button>
         <!-- Link -->
         <button id="createLink" class="option-button format">1&</button>
         <button id="unlink" class="option-button format">2&</button>
         <!-- Alighnment -->
         <button id="justifyLeft" class="option-button format">left</button>
         <button @click="ceneterFn()" id="justifyCenter" class="option-button format">ceneter</button>
         <button @click="rightFn()" id="justifyRight" class="option-button format">right</button>
         <button id="justifyFull" class="option-button format">full</button>
         <button id="intend" class="option-button format">intend</button>
         <button id="outdent" class="option-button format">outdent</button>
         <!-- headings -->
         <select id="formatBlock" class="adv-option-button">
           <option value="H1">H1</option>
           <option value="H2">H2</option>
           <option value="H3">H3</option>
           <option value="H4">H4</option>
           <option value="H5">H5</option>
           <option value="H6">H6</option>
           <option value="H7">H7</option>
         </select>
         <!-- font -->
         <select id="fontName" class="adv-option-button">
           <option value="H1">H1</option>
         </select>
         <select id="fontSize" class="adv-option-button">
         </select>
         <!-- color -->
         <div class="input-wrapper">
           <input type="color" id="foreColor" class="adv-option-button">
           <label for="foreColor">font color</label>
         </div>
         <div class="input-wrapper">
           <input type="color" id="backColor" class="adv-option-button">
           <label for="backColor">hightLight color</label>
         </div>
       </div>
        <div :class="[boldValue ? 'bold' : '', center ? 'center' : '', right ? 'right' : '']" id="text-input" ref="editInput" contenteditable="true"></div>
        <div class="toolbar">
          <button ref="boldButton">Bold</button>
          <button ref="italicButton">Italic</button>
          <button ref="underlineButton">Underline</button>
        </div>
        <div ref="editor" contenteditable="true" role="textbox" style="margin-top: 10px; border: 1px solid gray; padding: 10px; border-radius: 5px;">
          Start Editing...
        </div>
      </div>
    </div>
  </RoundedWhiteContainer>
</template>
<script setup>

</script>

<style scoped>
.editor-container{
  background-color: azure;
  width: 900px;
  padding: 50px 30px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  border-radius: 8px;
  border:1px solid black;
}
.options{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap:15px
}
button{
  height: 28px;
  width: 28px;
  display: grid;
  place-items: center;
  border-radius: 3px;
  border: none;
  background-color: #fff;
  outline: none;
  color: black;
}
select{
  padding: 7px;
  border: 1px solid black;
  border-radius: 3px;
}
.options label,
.options label{
  font-family: "Inter", sans-serif;
}
.input-wrapper{
  display: flex;
  align-items: center;
  gap: 8px;
}
input[type="color"]{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  width: 40px;
  height: 28px;
  border: none;
  cursor: pointer;
}
input[type="color"]::-webkit-color-swatch{
  border-radius: 15px;

}
#text-input{
  margin-top: 10px;
  border: 1px solid #dddddd;
  padding: 20px;
  height: 50vh;
}
.active{
  background-color: #e0e9ff;
}
.bold{
  font-weight: bold;
}
.center{
  text-align: center;
}
.right{
  text-align: right;
}
</style>
