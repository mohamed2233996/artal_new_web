import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useForm } from "react-hook-form";
import Review from "@/components/Review";
import Rating from "@/components/Rating";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import deleteReview from "@/actions/reviews/deleteReview";
import addReview from "@/actions/reviews/addReview";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "@/components/Arrows";
import { useTranslations } from "next-intl";
import { Session } from "next-auth";

/**
 *
 * Check if user is able to review. And if he has already reviewed, place his review to top.
 */
function placeUserReviewToTop(reviews: any[], session: Session) {
  const foundReview = reviews.findIndex(
    (r) => r.user?.id === session?.user?.id
  );
  if (foundReview !== -1) {
    const userReview = reviews.splice(foundReview, 1)[0];
    reviews.unshift(userReview);
  }
  return { reviews, foundReview: foundReview === -1 };
}

export default function ProductDetailInfoTab({
  productId,
  reviews: apiReviews,
}: {
  productId: string;
  reviews: any[];
}) {
  const { data: session } = useSession();
  const t = useTranslations("Store");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ content: string }>();

  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [canReview, setCanReview] = useState<boolean>();
  const [disableReviewSubmit, setDisableReviewSubmit] = useState(false);

  /**
   * Effects
   */
  useEffect(() => {
    if (apiReviews) {
      const modifiedReviews = placeUserReviewToTop(apiReviews, session!);
      setReviews(modifiedReviews.reviews);
      setCanReview(modifiedReviews.foundReview);
    }
  }, [apiReviews]);

  /**
   * Handlers
   */

  const onReviewSubmit = async (data: { content: string }) => {
    if (rating === 0) {
      return toast.error(t("Rate_First"));
    }
    const res = await addReview(productId, session?.token!, {
      content: data.content,
      rating,
    });

    if (res.statusCode === 201) {
      setReviews((prev) => [
        {
          id: res?.review?.reviewId,
          content: data.content,
          createdAt: res?.review?.createdAt,
          rating,
          user: {
            id: session?.user?.id,
            username: session?.user?.username,
          },
        },
        ...prev,
      ]);
      reset();
      setCanReview(false);
    } else if (res.statusCode === 400) {
      toast.error(t("Unordered_Product"), {
        duration: 5000,
        style: { textAlign: "center" },
      });
      setDisableReviewSubmit(true);
      reset();
      setRating(0);
    } else {
      toast.error(res.message);
    }
  };

  const onReviewDelete = async (reviewId: string) => {
    const res = await deleteReview(reviewId, session?.token!);
    if (res.statusCode !== 200) {
      toast.error(res.message);
    } else {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      setCanReview(true);
      setRating(0);
    }
  };

  return (
    <div className="product-detail__tab">
      <Tabs className="product-detail__tab__content">
        <TabList className="tab__content__header">
          <Tab>
            {" "}
            {t("Reviews")} ( {reviews.length} )
          </Tab>
        </TabList>

        <TabPanel className="tab__content__item -review ">
          <Slider
            dots={false}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            arrows={reviews.length === 1 || reviews.length === 0 ? false : true}
            slidesToShow={1}
            infinite={false}
          >
            {reviews.map((r, i) => (
              <Review
                id={r?.id}
                name={r?.user?.username}
                publicDate={r?.createdAt?.slice(0, 10)}
                rate={r?.rating}
                key={i}
                editable={r.user?.id === session?.user?.id}
                onReviewDelete={onReviewDelete}
              >
                {r.content}
              </Review>
            ))}
          </Slider>

          <div className="divider"></div>
          {session?.token && canReview && (
            <form>
              <div className="d-flex justify-content-between">
                <h5>{t("Write_Review")}</h5>
                <div style={{ maxWidth: 120, width: "100%" }}>
                  <Rating value={rating} setRating={setRating} />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="input-validator">
                    <textarea
                      placeholder={t("Content")}
                      rows={5}
                      {...register("content", {
                        required: {
                          message: t("Required"),
                          value: true,
                        },
                        minLength: {
                          value: 10,
                          message: t("Too_Short"),
                        },
                        maxLength: {
                          value: 1000,
                          message: t("Too_Large"),
                        },
                      })}
                    />
                    <span style={{ color: "red" }}>
                      {errors?.content?.message}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className={`${disableReviewSubmit && "-disable"} btn -dark`}
                    onClick={handleSubmit(onReviewSubmit)}
                  >
                    {t("Write_Review")}
                  </button>
                </div>
              </div>
            </form>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
}
