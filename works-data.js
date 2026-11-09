/**
 * ===============================================
 *  Works データファイル
 * ===============================================
 * works.html に表示する作品はすべてここで管理します。
 * 新しい作品を追加したいときは、下の配列に
 * オブジェクトを1つコピー＆ペーストして書き換えるだけでOKです。
 * HTMLファイルを直接触る必要はありません。
 *
 * 各項目の意味:
 *   image       : 作品画像のパス (images/works/ 以下を推奨)
 *   title       : 作品名
 *   description : 説明文
 *   links       : ボタンとして表示するリンクの配列 (複数可)
 *                 label: ボタンに表示する文言
 *                 url  : リンク先URL
 *
 * 配列の先頭に追加すると、一覧の先頭（新着扱い）に表示されます。
 * ===============================================
 */

const worksData = [
    //自動噴霧器
    {
        image: "images/works/spray.JPG",
        title: "自動首振り噴霧器",
        description:
            "研究室の自由課題で、自動噴霧器を作りました。人との距離に応じてモーターで首振り。スプレーのトリガーをモーターで動かす。ガシャガシャ動く植木鉢が誕生しました。",
        links: [
            {
                label: "Githubリポジトリ",
                url: "https://github.com/KyomaSuzuki/Flowerpot-shaped-sprayer",
            },
        ],
    },
    //ipadPOS
    {
        image: "images/works/ipadPos.jpg",
        title: "Ipad POSレジwebアプリ",
        description: "Ipadで使えるPOSレジアプリを作りました。新入生歓迎委員会で学園祭に出店する際に作りました。簡単に会計ができ、ログを見ることができます。",
        links: [
            {
                label: "webアプリ",
                url: "https://kyomasuzuki.github.io/Register/",

            },
        ],

    },
    //シューティング
    {
        image: "images/works/shooting.jpg",
        title: "縦型シューティングゲーム（開発中）",
        description: "ロケットを操作して敵を倒すシューティングゲームです。Unityで作りました。",
        links: [
            {
                labels: "Githubリポジトリ",
                url: "https://github.com/KyomaSuzuki/shooting",
            }
        ]
    },
    //リーダーサイト
    {
        image: "images/works/leader-site.png",
        title: "リーダーのためのワークシート",
        description:
            "サークル・委員会のリーダーのための、無料のワークシート。自分の組織運営の経験をもとに、経営学の定番フレームワークをサークル活動に活かせる形に置きかえました。",
        links: [
            {
                label: "webサイト",
                url: "https://learder-worksheet.hiyokingofheart.workers.dev/",
            },
        ],
    },
    //PCスタンド
    {
        image: "",
        title: "PCスタンド",
        description:
            "",
        links: [
            {
                label: "",
                url: "",
            },
        ],
    },
    //PIDシミュレーター
    {
        image: "",
        title: "PIDシミュレーター",
        description:
            "PID制御のシミュレーションができるサイトを作成しました。",
        links: [
            {
                label: "webサイト（開発中）",
                url: "https://kyomasuzuki.github.io/PID-simulator/",
            },
        ],
    },
];

