<template>
  <div>
    <el-radio-group v-model="mode" size="medium" @change="reset">
      <el-radio-button label="mode1">模式一</el-radio-button>
      <el-radio-button label="mode2">模式二</el-radio-button>
    </el-radio-group>

    <!-- 模式一 -->
    <div v-if="mode === 'mode1'" style="width: max-content">
      <el-row>
        <el-col :span="8">
          <el-input-number v-model="colorDifference1" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>色差系数1</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="colorDifference2" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>色差系数2</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="colorDifference3" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>色差系数3</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-input-number v-model="colorHarmony1" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>和谐度系数1</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="colorHarmony2" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>和谐度系数2</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="colorHarmony3" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>和谐度系数3</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-input-number v-model="colorCount" controls-position="right" :min="1" :max="10"></el-input-number>
          <span>生成颜色数量</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="getRandomColor">获取随机颜色组</el-button>
          <el-button @click="resetColors" v-if="colorResult">重新生成</el-button>
        </el-col>
      </el-row>
      <el-row v-if="colorResult">
        <el-col :span="24">
          <h3>推荐颜色组：</h3>
          <el-row>
            <el-col v-for="(color, index) in colorResult" :key="index" :span="4">
              <div class="color-block" :style="{ backgroundColor: color }">
                {{ color }}
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- 模式二 -->
    <div v-if="mode === 'mode2'" style="width: max-content">
      <el-row>
        <el-col :span="24">
          <el-color-picker v-model="selectedColors" :predefine="predefineColors" size="medium"></el-color-picker>
          <span>选择颜色</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-input-number v-model="colorDifference1" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>色差系数1</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="colorDifference2" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>色差系数2</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="colorDifference3" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>色差系数3</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-input-number v-model="colorHarmony1" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>和谐度系数1</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="colorHarmony2" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>和谐度系数2</span>
        </el-col>
        <el-col :span="8">
          <el-input-number v-model="colorHarmony3" controls-position="right" :min="0" :max="80"></el-input-number>
          <span>和谐度系数3</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="recommendColors">推荐颜色组</el-button>
        </el-col>
      </el-row>
      <el-row v-if="recommendationResult">
        <el-col :span="24">
          <h3>推荐颜色组：</h3>
          <el-row>
            <el-col v-for="(color, index) in recommendationResult" :key="index" :span="4">
              <div class="color-block" :style="{ backgroundColor: color }">
                {{ color }}
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      mode: 'mode1',
      colorDifference1: 0,
      colorDifference2: 0,
      colorDifference3: 0,
      colorHarmony1: 0,
      colorHarmony2: 0,
      colorHarmony3: 0,
      colorCount: 1,
      colorResult: null,
      selectedColors: [],
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#40b3ff',
        '#ff69b4',
        '#00bfff'
      ],
      recommendationResult: null,
    };
  },
  methods: {
    getRandomColor() {
      axios
          .post("http://127.0.0.1:5000/check", {
            colorDifference1: this.colorDifference1,
            colorDifference2: this.colorDifference2,
            colorDifference3: this.colorDifference3,
            colorHarmony1: this.colorHarmony1,
            colorHarmony2: this.colorHarmony2,
            colorHarmony3: this.colorHarmony3,
            colorCount: this.colorCount,
          })
          .then((response) => {
            this.colorResult = response.data.color;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    resetColors() {
      this.colorResult = null;
      this.getRandomColor();
    },
    recommendColors() {
      axios
          .post("http://127.0.0.1:5000/recommend", {
            selectedColors: this.selectedColors,
            colorDifference1: this.colorDifference1,
            colorDifference2: this.colorDifference2,
            colorDifference3: this.colorDifference3,
            colorHarmony1: this.colorHarmony1,
            colorHarmony2: this.colorHarmony2,
            colorHarmony3: this.colorHarmony3,
          })
          .then((response) => {
            this.recommendationResult = response.data.color;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    reset() {
      this.colorResult = null;
      this.recommendationResult = null;
      this.selectedColors = [];
    },
  },
};
</script>

<style scoped>
.color-block {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
}
</style>