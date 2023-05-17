# Gratitude Journal

> _毎日感謝を記録する習慣を身に付けましょう！_ <br>
> 開発者：Yejin Ha

<br><br>

# 概要

感謝をすればするほど、人間は肯定的な考え方を持つようになります。
私は学校にいながら、どんどん感謝をしなくなり、否定的に考えるようになりました。
これを変えるため、Gratitude Journal という WEB を作りました。
<br><br>

# 特徴

1. 感謝を記録することができます。
2. CLOVA SENTIMENT API を利用し、感情を分析します。
3. 毎日９時になると、PUSH NOTIFICATION で感謝をするようにお知らせします。
4. LOGIN／REGISTER ができ、自分の書いた感謝は自分だけ見ることができるよう、セッティングしておきました。
   <br><br>

# イメージ

<img src="md/login.png" width="30%" height="30%" >
<br> FIREBASEのAUTHを利用し、Authenticationができるようにしました。<br><br>
<img src="md/main.png" width="30%" height="30%" >
<br>毎日感謝を記録します。知らない人の感謝の一言がメインページに表示されるようにしました。<br><br>
<img src="md/analyze.png" width="30%" height="30%" >
<br>CLOVA SENTIMENT APIを使って、自分の入力した感謝がポジティブなのか、普通なのか、否定的なのかをChartで見ることができます。結果につれて、様々な応援のメッセージが表示されます。<br><br>
<img src="md/total.png" width="30%" height="30%" >
<br>今まで書いた感謝リストです。Txtファイルで保存できるようにしました。感謝したことの感情も見ることができます。<br><br>
